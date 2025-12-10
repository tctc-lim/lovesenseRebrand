"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

export default function CookiePolicyPage() {
    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Cookie Policy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Cookie Policy</h1>
                    <p className="text-lg text-white/90 sm:text-xl">Last Updated: 2025</p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* Introduction */}
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                                This Cookie Policy explains how we use cookies and similar tracking technologies when you visit our website. By using our site, you agree to the use of cookies in accordance with this policy.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Cookie Policy Content */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative space-y-12">
                        {/* Section 1: What Are Cookies? */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">1. What Are Cookies?</h2>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website. They help improve your browsing experience and allow us to analyze how our website is used.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 2: Types of Cookies We Use */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">2. Types of Cookies We Use</h2>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.1 Essential Cookies</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            These cookies are necessary for the website to function properly. Without them, some features—like booking forms or secure login—may not work.
                                        </p>
                                        <p className="mb-2 font-semibold text-slate-900">Examples:</p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>Session cookies</li>
                                            <li>Security and authentication cookies</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.2 Performance & Analytics Cookies</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            These cookies help us understand how visitors interact with the website.
                                        </p>
                                        <p className="mb-2 font-semibold text-slate-900">We use tools like:</p>
                                        <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                            <li>Google Analytics</li>
                                            <li>Meta Pixel</li>
                                            <li>Other analytics platforms</li>
                                        </ul>
                                        <p className="mb-2 font-semibold text-slate-900">These tools track:</p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>Pages visited</li>
                                            <li>Time spent on the website</li>
                                            <li>Device and browser type</li>
                                            <li>Navigation patterns</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.3 Functional Cookies</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            These cookies remember your preferences, such as:
                                        </p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>Country selection</li>
                                            <li>Language</li>
                                            <li>Form details (if allowed)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.4 Advertising or Marketing Cookies</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            We may use advertising cookies to show relevant ads or measure campaign performance. These may be set by third-party platforms like:
                                        </p>
                                        <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                            <li>Facebook</li>
                                            <li>Google</li>
                                            <li>Instagram</li>
                                            <li>TikTok</li>
                                        </ul>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            You may encounter these cookies when interacting with ads.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 3: How We Use Cookies */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">3. How We Use Cookies</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We use cookies to:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Improve website performance</li>
                                    <li>Analyze visitor behavior</li>
                                    <li>Personalize your browsing experience</li>
                                    <li>Process bookings efficiently</li>
                                    <li>Remember login preferences (if applicable)</li>
                                    <li>Deliver relevant advertising</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We do not use cookies to collect counseling session data or sensitive personal information.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 4: Third-Party Cookies */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">4. Third-Party Cookies</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Some cookies come from third-party services embedded on our website, such as:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Video players (YouTube, Vimeo)</li>
                                    <li>Analytics tools</li>
                                    <li>Payment processors (e.g., Paystack)</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    These third parties may collect information according to their own privacy policies.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 5: Managing Cookies */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">5. Managing Cookies</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    You can manage or disable cookies through your browser settings.
                                </p>
                                <p className="mb-4 font-semibold text-slate-900">Most browsers allow you to:</p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Delete existing cookies</li>
                                    <li>Block new cookies</li>
                                    <li>Receive notifications before cookies are stored</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    <strong>Note:</strong> Disabling certain cookies may affect website functionality.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 6: Consent */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">6. Consent</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Upon your first visit, our website displays a cookie consent banner.
                                </p>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    By clicking &quot;Accept,&quot; you consent to the use of cookies as described in this policy.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    You may withdraw consent at any time by adjusting your browser settings or contacting us.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 7: Updates to This Cookie Policy */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">7. Updates to This Cookie Policy</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We may update this policy periodically.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Changes will be posted on this page with an updated &quot;Last Updated&quot; date.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 8: Contact Us */}
                        <Reveal>
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-slate-900">8. Contact Us</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    For questions about this Cookie Policy:
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Email</p>
                                        <a
                                            href="mailto:Hq.mylovesense@gmail.com"
                                            className="text-lg font-semibold text-brand-purple transition hover:text-brand-purple-light"
                                        >
                                            Hq.mylovesense@gmail.com
                                        </a>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Phone</p>
                                        <a
                                            href="tel:+233591461808"
                                            className="text-lg font-semibold text-brand-purple transition hover:text-brand-purple-light"
                                        >
                                            +233591461808
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </div>
    );
}
