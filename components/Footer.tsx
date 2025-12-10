import Link from "next/link";
import Image from "next/image";

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
                        <p className="text-sm text-white/90">
                            We provide compassionate, evidence-based virtual counseling to individuals and couples worldwide.
                            Our trained counselors offer flexible, judgment-free support tailored to your unique needs.
                        </p>
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
                        <form className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your message"
                                    rows={3}
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-white/90"
                            >
                                Send Message
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

