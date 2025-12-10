"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus({
                    type: "success",
                    message: result.message || "Your message has been sent successfully!",
                });
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus({
                    type: "error",
                    message: result.error || "Failed to send message. Please try again.",
                });
            }
        } catch {
            setSubmitStatus({
                type: "error",
                message: "An error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Contact Love Sense"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Contact</h1>
                    <p className="text-xl text-white/90 sm:text-2xl">Get in touch with us</p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
                {/* Contact Information Section */}
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative grid gap-8 md:grid-cols-2">
                        {/* Phone Card */}
                        <Reveal>
                            <div className="group relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-white p-10 shadow-xl transition-all hover:border-brand-purple hover:shadow-2xl">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-brand-purple to-brand-purple-light">
                                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-4 text-xl font-semibold text-slate-900">Phone</h2>
                                <a
                                    href="tel:+233-59-146-1808"
                                    className="text-xl font-bold text-brand-purple transition hover:text-brand-purple-light sm:text-2xl"
                                >
                                    +233-59-146-1808
                                </a>
                            </div>
                        </Reveal>

                        {/* Working Hours Card */}
                        <Reveal>
                            <div className="group relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-white p-10 shadow-xl transition-all hover:border-brand-purple hover:shadow-2xl">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-brand-purple-light to-brand-purple">
                                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-6 text-xl font-semibold text-slate-900">Working Days</h2>
                                <div className="space-y-4">
                                    <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Monday – Friday</p>
                                        <p className="mt-1 text-lg font-bold text-brand-purple">24 hours</p>
                                    </div>
                                    <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Saturday – Sunday</p>
                                        <p className="mt-1 text-lg font-bold text-brand-purple">24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="mb-12 text-center">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">Get in Touch</p>
                            <h2 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">Send us a Message</h2>
                            <p className="text-lg text-slate-600">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                        </div>
                        <Reveal>
                            <div className="rounded-3xl border-2 border-purple-200 bg-white p-8 md:p-12 shadow-xl">
                                {submitStatus.type && (
                                    <div
                                        className={`mb-6 rounded-xl p-4 ${submitStatus.type === "success"
                                            ? "bg-green-50 border border-green-200 text-green-800"
                                            : "bg-red-50 border border-red-200 text-red-800"
                                            }`}
                                    >
                                        <p className="text-sm font-medium">{submitStatus.message}</p>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                                            Phone
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            className="rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                            placeholder="+233-XX-XXX-XXXX"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            className="rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            required
                                            className="rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>
                                    <div className="flex items-center justify-between sm:col-span-2">
                                        <p className="text-xs text-slate-500">
                                            We respond within 24 hours. Your information is confidential.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-purple to-brand-purple-light px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                            {!isSubmitting && (
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Important Note */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="rounded-3xl border-2 border-red-200 bg-red-50/80 p-8 md:p-12">
                            <Reveal>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-red-900">PLEASE NOTE</h3>
                                        <p className="text-base leading-relaxed text-red-800 sm:text-lg">
                                            We are NOT a medical or psychiatric clinic and do NOT provide clinical services.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="rounded-3xl border-2 border-purple-200 bg-brand-purple p-12 md:p-16">
                            <Reveal>
                                <div className="flex flex-col items-center gap-6 text-center">
                                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                        Ready to Start Your Healing Journey?
                                    </h2>
                                    <p className="max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">
                                        Reach out to us today. We&apos;re here 24/7 to support you.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-4">
                                        <Link
                                            href="/booking"
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-purple shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            Book a Session
                                        </Link>
                                        <a
                                            href="tel:+233-59-146-1808"
                                            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold !text-white transition hover:bg-white/10"
                                        >
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
