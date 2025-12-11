"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

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
                                <FaFacebook className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://www.instagram.com/mylovesense.online?igsh=bnR2bmpleW0ydjBz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/lovesense"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:opacity-80 transition-opacity"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-7 h-7 text-white" />
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

