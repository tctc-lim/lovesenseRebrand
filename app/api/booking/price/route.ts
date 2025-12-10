import { NextRequest, NextResponse } from "next/server";

interface PromoCode {
    code: string;
    percentage: number;
}

// Map country codes to currency codes
const countryToCurrency: Record<string, string> = {
    NG: "NGN", // Nigeria
    US: "USD", // United States
    GB: "GBP", // United Kingdom
    GH: "GHS", // Ghana
    CA: "USD", // Canada (using USD)
    AU: "USD", // Australia (using USD)
    // Add more mappings as needed
};

// Get promo codes from environment variable
function getPromoCodes(): PromoCode[] {
    if (process.env.PROMO_CODES) {
        try {
            return JSON.parse(process.env.PROMO_CODES);
        } catch (error) {
            console.error("Error parsing PROMO_CODES from environment:", error);
            return [];
        }
    }
    return [];
}

const sessionPrices = {
    "200": 200,
    "550": 550,
    "900": 900,
};

// Hardcoded prices for different currencies
const currencyPrices: Record<string, Record<string, number>> = {
    NGN: { "200": 20000, "550": 58000, "900": 95000 }, // Nigeria - Naira
    USD: { "200": 20, "550": 58, "900": 96 }, // United States - Dollar
    GBP: { "200": 15, "550": 43, "900": 72 }, // United Kingdom - Pound
    GHS: { "200": 200, "550": 550, "900": 900 }, // Ghana - Cedis (default/base price)
};

const currencySymbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    GHS: "GHS ",
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessions, promoCode, preferredCurrency } = body;

        if (!sessions || !sessionPrices[sessions as keyof typeof sessionPrices]) {
            return NextResponse.json(
                { success: false, error: "Invalid session selection" },
                { status: 400 }
            );
        }

        // Get user's IP and location using geoip-lite
        const forwarded = request.headers.get("x-forwarded-for");
        const realIp = request.headers.get("x-real-ip");
        const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare
        const ip = forwarded
            ? forwarded.split(",")[0].trim()
            : cfConnectingIp
                ? cfConnectingIp.trim()
                : realIp
                    ? realIp.trim()
                    : "";

        // Default to GHS (Ghana Cedis)
        let targetCurrency = "GHS";
        let targetSymbol = "GHS ";
        let finalPrice = sessionPrices[sessions as keyof typeof sessionPrices];

        // Detection priority (IP-based location takes priority over browser locale):
        // 1. Check Vercel/Cloudflare geolocation headers (most reliable)
        // 2. Use geoip-lite to detect from IP (REAL location - most important!)
        // 3. Use client-side browser locale detection (less reliable - only if IP detection fails)
        // 4. Fallback to GHS

        let locationDetected = false;

        // Method 1: Try Vercel/Cloudflare geolocation headers first (most reliable)
        const countryCode = request.headers.get("x-vercel-ip-country") ||
            request.headers.get("cf-ipcountry") ||
            request.headers.get("x-country-code");

        if (countryCode) {
            const detectedCurrency = countryToCurrency[countryCode.toUpperCase()] || "GHS";
            console.log(`[Header] Country from header: ${countryCode}, Mapped currency: ${detectedCurrency}`);

            if (currencyPrices[detectedCurrency]?.[sessions]) {
                targetCurrency = detectedCurrency;
                targetSymbol = currencySymbols[targetCurrency] || `${targetCurrency} `;
                finalPrice = currencyPrices[detectedCurrency][sessions];
                locationDetected = true;
                console.log(`[Header] ✅ Using currency: ${targetCurrency} (${targetSymbol}), Price: ${finalPrice}`);
            }
        }

        // Method 2: Use geoip-lite for IP-based detection (REAL location - takes priority over browser locale!)
        if (!locationDetected && ip && ip !== "127.0.0.1" && ip !== "::1" && !ip.startsWith("192.168.") && !ip.startsWith("10.") && !ip.startsWith("172.16.")) {
            try {
                const geoipModule = await import("geoip-lite");
                const geo = geoipModule.lookup(ip);
                console.log(`[GeoIP] IP: ${ip}, Geo result:`, JSON.stringify(geo, null, 2));

                if (geo && geo.country) {
                    const detectedCurrency = countryToCurrency[geo.country] || "GHS";
                    console.log(`[GeoIP] Country detected: ${geo.country}, Mapped currency: ${detectedCurrency}`);

                    if (currencyPrices[detectedCurrency]?.[sessions]) {
                        targetCurrency = detectedCurrency;
                        targetSymbol = currencySymbols[targetCurrency] || `${targetCurrency} `;
                        finalPrice = currencyPrices[detectedCurrency][sessions];
                        locationDetected = true;
                        console.log(`[GeoIP] ✅ Using currency: ${targetCurrency} (${targetSymbol}), Price: ${finalPrice}`);
                    } else {
                        console.log(`[GeoIP] ⚠️ Detected location: ${geo.country}, but no pricing for currency ${detectedCurrency}, using GHS`);
                    }
                } else {
                    console.warn(`[GeoIP] ❌ Could not detect location for IP: ${ip}, Geo result:`, geo);
                }
            } catch (error) {
                console.error("[GeoIP] Error loading geoip-lite:", error);
                // Continue to next method
            }
        } else if (!locationDetected && ip) {
            console.warn(`[GeoIP] ⚠️ Skipping IP detection for localhost/private IP: ${ip}`);
        }

        // Method 3: Use client-side browser locale detection ONLY as last resort
        // (Browser locale is unreliable - user might have US locale but be in Nigeria)
        // Only use if IP-based detection failed
        if (!locationDetected && preferredCurrency && currencyPrices[preferredCurrency]?.[sessions]) {
            targetCurrency = preferredCurrency;
            targetSymbol = currencySymbols[targetCurrency] || `${targetCurrency} `;
            finalPrice = currencyPrices[preferredCurrency][sessions];
            console.log(`[Client] ⚠️ Using browser locale currency (less reliable, IP detection failed): ${targetCurrency}`);
        }

        // If still GHS, that's the default (Ghana)
        if (targetCurrency === "GHS" && !locationDetected) {
            console.log(`[Default] Using default currency: GHS (Ghana) - no location detected`);
        }

        // Apply promo code discount
        const promoCodes = getPromoCodes();
        let promoApplied = false;
        if (promoCode && promoCode.trim() && promoCodes.length > 0) {
            const promo = promoCodes.find(
                (p) => p.code.toLowerCase() === promoCode.trim().toLowerCase()
            );
            if (promo) {
                const discount = (finalPrice * promo.percentage) / 100;
                finalPrice = finalPrice - discount;
                promoApplied = true;
            }
        }

        // GHS amount is always the base price (before promo if promo was applied to local currency)
        const ghsAmount = sessionPrices[sessions as keyof typeof sessionPrices];
        // If promo was applied, calculate GHS equivalent
        let finalGhsAmount = ghsAmount;
        if (promoApplied && promoCode && promoCode.trim() && promoCodes.length > 0) {
            const promo = promoCodes.find(
                (p) => p.code.toLowerCase() === promoCode.trim().toLowerCase()
            );
            if (promo) {
                finalGhsAmount = ghsAmount - (ghsAmount * promo.percentage) / 100;
            }
        }

        return NextResponse.json({
            success: true,
            priceInfo: {
                amount: Math.round(finalPrice * 100) / 100,
                currency: targetCurrency,
                symbol: targetSymbol,
                ghsAmount: Math.round(finalGhsAmount * 100) / 100,
            },
            promoApplied,
        });
    } catch (error) {
        console.error("Price calculation error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to calculate price" },
            { status: 500 }
        );
    }
}
