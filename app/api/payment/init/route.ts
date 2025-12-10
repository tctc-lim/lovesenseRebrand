import { NextRequest, NextResponse } from "next/server";

// Paystack secret key - should be in environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

// Base GHS prices (these are the actual prices charged)
const baseGhsPrices: Record<string, number> = {
    "200": 200,
    "550": 550,
    "900": 900,
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            currency,
            email,
            session_type,
            selected_sessions,
            customer_name,
            customer_phone,
            display_amount,
            display_currency,
        } = body;

        if (!email) {
            return NextResponse.json(
                { status: false, message: "Email is required" },
                { status: 400 }
            );
        }

        // Get the base GHS amount
        const ghsAmount = baseGhsPrices[selected_sessions] || 200;

        // Initialize Paystack payment
        // Amount is in kobo (smallest currency unit), so multiply by 100
        // Since we're using GHS, multiply by 100
        const amountInKobo = Math.round(ghsAmount * 100);

        const paystackData = {
            email,
            amount: amountInKobo,
            currency: "GHS",
            reference: `LS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://mylovesense.online"}/booking/success`,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: customer_name,
                    },
                    {
                        display_name: "Customer Phone",
                        variable_name: "customer_phone",
                        value: customer_phone,
                    },
                    {
                        display_name: "Session Type",
                        variable_name: "session_type",
                        value: session_type,
                    },
                    {
                        display_name: "Display Amount",
                        variable_name: "display_amount",
                        value: `${display_amount} ${display_currency}`,
                    },
                ],
            },
        };

        // Call Paystack API
        const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paystackData),
        });

        const paystackResult = await paystackResponse.json();

        if (paystackResult.status && paystackResult.data) {
            return NextResponse.json({
                status: true,
                message: "Payment initialized successfully",
                data: {
                    authorization_url: paystackResult.data.authorization_url,
                    access_code: paystackResult.data.access_code,
                    reference: paystackResult.data.reference,
                    ghs_amount: ghsAmount,
                    display_amount: display_amount,
                    display_currency: display_currency,
                    session_type: session_type,
                },
            });
        } else {
            return NextResponse.json(
                {
                    status: false,
                    message: paystackResult.message || "Payment initialization failed",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Payment initialization error:", error);
        return NextResponse.json(
            {
                status: false,
                message: "An error occurred while initializing payment",
            },
            { status: 500 }
        );
    }
}

