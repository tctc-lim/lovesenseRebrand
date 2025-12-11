"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const primaryLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Booking", href: "/booking" },
];

const legalLinks = [
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
];

export function Footer() {
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
        <footer className="mt-20 border-t border-purple-200 bg-brand-purple backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo and Description */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/images/logos/logo3.png"
                                alt="Love Sense Logo"
                                width={150}
                                height={50}
                                className="h-auto w-auto"
                            />
                        </Link>
                        <p className="text-sm text-white/90 mb-4">
                            We provide compassionate, evidence-based virtual counseling to individuals and couples worldwide.
                            Our trained counselors offer flexible, judgment-free support tailored to your unique needs.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/share/19hiA2BZFF/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="Facebook"
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/mylovesense.online?igsh=bnR2bmpleW0ydjBz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="Instagram"
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/lovesense"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
                            Explore
                        </h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            {primaryLinks.map((link) => (
                                <li key={link.href} className="hover:text-white hover:underline">
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            {legalLinks.map((link) => (
                                <li key={link.href} className="hover:text-white hover:underline">
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
                            Get in Touch
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    required
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your message"
                                    rows={3}
                                    required
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                                />
                            </div>
                            {submitStatus.type && (
                                <div
                                    className={`rounded-lg px-3 py-2 text-xs ${submitStatus.type === "success"
                                        ? "bg-green-500/20 text-green-200"
                                        : "bg-red-500/20 text-red-200"
                                        }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex text-xs text-white/70 text-center justify-center">
                    <span>© {new Date().getFullYear()} Love Sense. All rights reserved.</span>

                </div>
            </div>
        </footer>
    );
}

