"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

interface BookingFormData {
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
    country: string;
    email: string;
    service: string;
    date: string;
    time: string;
    sessions: string;
    promoCode: string;
    price: string;
}

interface Country {
    name: { common: string };
    cca2: string;
    idd: { root: string; suffixes: string[] };
    flags: { png: string };
}

interface PriceInfo {
    amount: number;
    currency: string;
    symbol: string;
    ghsAmount: number;
}

const services = [
    "Private Counselling",
    "Relationship Counselling",
    "Marriage Counselling",
];

const sessionOptions = [
    { value: "200", label: "1 Session", price: 200 },
    { value: "550", label: "3 Sessions", price: 550 },
    { value: "900", label: "5 Sessions", price: 900 },
];

export default function BookingPage() {
    const [formData, setFormData] = useState<BookingFormData>({
        firstName: "",
        lastName: "",
        phone: "",
        countryCode: "",
        country: "",
        email: "",
        service: "",
        date: "",
        time: "",
        sessions: "200",
        promoCode: "",
        price: "",
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);

    const [priceInfo, setPriceInfo] = useState<PriceInfo>({
        amount: 200,
        currency: "GHS",
        symbol: "GHS ",
        ghsAmount: 200,
    });

    const [errors, setErrors] = useState<Partial<BookingFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState("");

    // Set minimum date to today
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const minDate = `${year}-${month}-${day}`;
        const dateInput = document.getElementById("date") as HTMLInputElement;
        if (dateInput) {
            dateInput.min = minDate;
        }
    }, []);

    // Fetch countries data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags");
                const data = await response.json();
                // Sort countries alphabetically
                data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
                setCountries(data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setIsLoadingCountries(false);
            }
        };
        fetchCountries();
    }, []);

    // Sync country selection with country code
    useEffect(() => {
        if (formData.country && countries.length > 0) {
            const selectedCountry = countries.find((c) => c.cca2 === formData.country);
            if (selectedCountry) {
                const dialCode = selectedCountry.idd.root + (selectedCountry.idd.suffixes?.[0] || "");
                if (dialCode) {
                    setFormData((prev) => {
                        if (prev.countryCode !== dialCode) {
                            return { ...prev, countryCode: dialCode };
                        }
                        return prev;
                    });
                }
            }
        }
    }, [formData.country, countries, formData.countryCode]);

    const updatePrice = useCallback(async () => {
        setIsLoadingPrice(true);
        try {
            const selectedSessions = formData.sessions;
            const promoCode = formData.promoCode.trim();

            // Try to detect currency from browser locale as fallback
            let detectedCurrency = null;
            try {
                // Get currency from browser locale (e.g., "en-NG" -> NGN)
                const locale = navigator.language || navigator.languages?.[0] || "en-US";
                // Try to get currency from locale string (e.g., "en-NG" -> check for NG)
                if (locale.includes("NG")) {
                    detectedCurrency = "NGN";
                } else if (locale.includes("US")) {
                    detectedCurrency = "USD";
                } else if (locale.includes("GB")) {
                    detectedCurrency = "GBP";
                } else if (locale.includes("GH")) {
                    detectedCurrency = "GHS";
                }
            } catch {
                // Ignore locale detection errors
            }

            // Get user location and currency
            const response = await fetch("/api/booking/price", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessions: selectedSessions,
                    promoCode: promoCode,
                    preferredCurrency: detectedCurrency, // Pass detected currency as hint
                }),
            });

            const data = await response.json();
            if (data.success) {
                setPriceInfo(data.priceInfo);
                setFormData((prev) => ({
                    ...prev,
                    price: `${data.priceInfo.symbol}${data.priceInfo.amount}`,
                }));
                setPromoApplied(data.promoApplied || false);
                setPromoError("");
            } else {
                // Fallback to GHS
                const basePrice = sessionOptions.find((s) => s.value === selectedSessions)?.price || 200;
                setPriceInfo({
                    amount: basePrice,
                    currency: "GHS",
                    symbol: "GHS ",
                    ghsAmount: basePrice,
                });
                setFormData((prev) => ({
                    ...prev,
                    price: `GHS ${basePrice}`,
                }));
            }
        } catch (error) {
            console.error("Price calculation error:", error);
            // Fallback to GHS
            const basePrice = sessionOptions.find((s) => s.value === formData.sessions)?.price || 200;
            setPriceInfo({
                amount: basePrice,
                currency: "GHS",
                symbol: "GHS ",
                ghsAmount: basePrice,
            });
            setFormData((prev) => ({
                ...prev,
                price: `GHS ${basePrice}`,
            }));
        } finally {
            setIsLoadingPrice(false);
        }
    }, [formData.sessions, formData.promoCode]);

    // Calculate price when sessions or promo code changes
    useEffect(() => {
        updatePrice();
    }, [updatePrice]);

    const validateForm = (): boolean => {
        const newErrors: Partial<BookingFormData> = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.countryCode.trim()) newErrors.countryCode = "Country code is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.service) newErrors.service = "Please select a service";
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.time) newErrors.time = "Please select a time";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: `${formData.countryCode} ${formData.phone}`,
                    country: formData.country,
                    service: formData.service,
                    appointmentDate: formData.date,
                    time: formData.time,
                    sessions: sessionOptions.find((s) => s.value === formData.sessions)?.label || "1 Session",
                    price: formData.price,
                    promoCode: formData.promoCode || null,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccessModal(true);
            } else {
                alert(data.error || "An error occurred while processing your booking");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred while processing your booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProceedToPayment = async () => {
        if (!formData.email) {
            alert("Please enter your email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/payment/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currency: priceInfo.currency,
                    email: formData.email,
                    session_type: sessionOptions.find((s) => s.value === formData.sessions)?.label || "1 Session",
                    selected_sessions: formData.sessions,
                    customer_name: `${formData.firstName} ${formData.lastName}`,
                    customer_phone: `${formData.countryCode} ${formData.phone}`,
                    display_amount: priceInfo.amount,
                    display_currency: priceInfo.currency,
                }),
            });

            const data = await response.json();

            if (data.status && data.data?.authorization_url) {
                setPaymentUrl(data.data.authorization_url);
                setShowPaymentModal(true);
                setShowSuccessModal(false);
            } else {
                alert(data.message || "Payment initialization failed");
            }
        } catch (error) {
            console.error("Payment initialization error:", error);
            alert("Payment initialization failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof BookingFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Book a Session"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Book a Session</h1>
                    <p className="text-xl text-white/90 sm:text-2xl">Schedule your counseling session with us</p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <div className="rounded-3xl border-2 border-purple-200 bg-white p-8 md:p-12 shadow-xl">
                                <h2 className="mb-6 text-2xl font-bold text-slate-900">Booking Form</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">
                                                First Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.firstName
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                    }`}
                                                placeholder="Your First Name"
                                            />
                                            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Last Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.lastName
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                    }`}
                                                placeholder="Your Last Name"
                                            />
                                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    {/* Phone and Country Fields */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex gap-2">
                                                <select
                                                    id="countryCode"
                                                    value={formData.countryCode}
                                                    onChange={(e) => handleInputChange("countryCode", e.target.value)}
                                                    className={`w-32 rounded-xl border-2 px-3 py-3 text-sm text-slate-900 transition focus:outline-none focus:ring-2 ${errors.countryCode
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                        }`}
                                                >
                                                    <option value="">Code</option>
                                                    {countries.map((country) => {
                                                        const dialCode = country.idd.root + (country.idd.suffixes?.[0] || "");
                                                        if (!dialCode) return null;
                                                        return (
                                                            <option key={country.cca2} value={dialCode} data-country={country.cca2}>
                                                                {country.cca2} {dialCode}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.phone
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                        }`}
                                                    placeholder="Your Phone Number"
                                                />
                                            </div>
                                            {(errors.phone || errors.countryCode) && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone || errors.countryCode}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="country" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Country <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="country"
                                                value={formData.country}
                                                onChange={(e) => handleInputChange("country", e.target.value)}
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.country
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                    }`}
                                                disabled={isLoadingCountries}
                                            >
                                                <option value="">-- Select Country --</option>
                                                {countries.map((country) => (
                                                    <option key={country.cca2} value={country.cca2}>
                                                        {country.name.common}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.email
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                }`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    {/* Service Selection */}
                                    <div>
                                        <label htmlFor="service" className="mb-2 block text-sm font-semibold text-slate-700">
                                            Service <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="service"
                                            value={formData.service}
                                            onChange={(e) => handleInputChange("service", e.target.value)}
                                            className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.service
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                }`}
                                        >
                                            <option value="">-- Select Service --</option>
                                            {services.map((service) => (
                                                <option key={service} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
                                    </div>

                                    {/* Date and Time */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="date" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => handleInputChange("date", e.target.value)}
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.date
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                    }`}
                                            />
                                            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="time" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="time"
                                                type="time"
                                                value={formData.time}
                                                onChange={(e) => handleInputChange("time", e.target.value)}
                                                className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 transition focus:outline-none focus:ring-2 ${errors.time
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-purple-100 focus:border-brand-purple focus:ring-brand-purple/20"
                                                    }`}
                                            />
                                            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                                        </div>
                                    </div>

                                    {/* Sessions Selection */}
                                    <div>
                                        <label htmlFor="sessions" className="mb-2 block text-sm font-semibold text-slate-700">
                                            Number of Session(s)
                                        </label>
                                        <select
                                            id="sessions"
                                            value={formData.sessions}
                                            onChange={(e) => handleInputChange("sessions", e.target.value)}
                                            className="w-full rounded-xl border-2 border-purple-100 px-4 py-3 text-slate-900 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                        >
                                            {sessionOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="grid gap-4 sm:grid-cols-[1fr,auto]">
                                        <div>
                                            <label htmlFor="promoCode" className="mb-2 block text-sm font-semibold text-slate-700">
                                                Promo Code
                                            </label>
                                            <input
                                                id="promoCode"
                                                type="text"
                                                value={formData.promoCode}
                                                onChange={(e) => handleInputChange("promoCode", e.target.value)}
                                                className="w-full rounded-xl border-2 border-purple-100 px-4 py-3 text-slate-900 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                                placeholder="Enter promo code"
                                            />
                                            {promoApplied && <p className="mt-1 text-sm text-green-600">Promo code applied!</p>}
                                            {promoError && <p className="mt-1 text-sm text-red-600">{promoError}</p>}
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                type="button"
                                                onClick={updatePrice}
                                                className="rounded-xl border-2 border-brand-purple bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-purple-light"
                                            >
                                                Check
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Display */}
                                    <div>
                                        <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-700">
                                            Price
                                        </label>
                                        <input
                                            id="price"
                                            type="text"
                                            value={isLoadingPrice ? "Calculating..." : formData.price}
                                            disabled
                                            className="w-full rounded-xl border-2 border-purple-100 bg-purple-50 px-4 py-3 text-slate-900"
                                        />
                                    </div>

                                    {/* Payment Info Notice */}
                                    <div className="rounded-xl border-l-4 border-brand-purple bg-purple-50/50 p-4">
                                        <p className="text-sm text-slate-700">
                                            <strong>Payment Information:</strong> Prices are displayed in your local currency for convenience.
                                            All payments are processed in Ghanaian Cedis (GHS) through Paystack. Your bank will handle the
                                            currency conversion automatically.
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full rounded-full bg-linear-to-r from-brand-purple to-brand-purple-light px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            "Book Now"
                                        )}
                                    </button>

                                    <p className="text-center text-sm text-slate-500">
                                        <strong>Note:</strong> We will respond to you as soon as we can.
                                    </p>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-slate-900">Thank You!</h3>
                            <p className="mb-6 text-slate-600">
                                Thank you for booking a session with us. Kindly proceed to make payment, and we will reach out to you
                                shortly.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="flex-1 rounded-full border-2 border-purple-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-purple-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleProceedToPayment}
                                    disabled={isSubmitting}
                                    className="flex-1 rounded-full bg-brand-purple px-6 py-3 font-semibold text-white transition hover:bg-brand-purple-light disabled:opacity-50"
                                >
                                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Conversion Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="mb-6 text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v4a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-slate-900">Payment Information</h3>
                        </div>
                        <div className="mb-6 rounded-xl border-2 border-purple-200 bg-purple-50/50 p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="text-center">
                                    <p className="mb-2 text-sm font-semibold text-slate-600">Your Local Price</p>
                                    <p className="text-3xl font-bold text-brand-purple">
                                        {priceInfo.symbol}
                                        {priceInfo.amount}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="mb-2 text-sm font-semibold text-slate-600">Payment Amount</p>
                                    <p className="text-3xl font-bold text-brand-lemon">{priceInfo.ghsAmount} GHS</p>
                                </div>
                            </div>
                            <div className="mt-6 rounded-lg bg-blue-50 p-4">
                                <p className="text-sm text-slate-700">
                                    <strong>Secure Payment:</strong> Your payment will be processed in Ghanaian Cedis (GHS) through our
                                    secure payment partner, Paystack. Your bank will automatically handle the currency conversion at the
                                    current exchange rate.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="flex-1 rounded-full border-2 border-purple-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-purple-50"
                            >
                                Cancel
                            </button>
                            <a
                                href={paymentUrl}
                                className="flex-1 rounded-full bg-brand-purple px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-purple-light"
                            >
                                Proceed to Payment
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
