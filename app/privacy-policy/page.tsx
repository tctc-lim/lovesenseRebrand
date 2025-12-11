"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

export default function PrivacyPolicyPage() {
    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Privacy Policy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Privacy Policy</h1>
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
                                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our counseling services.
                            </p>
                            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
                                By using our website or booking a session, you consent to the data practices described in this policy.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Privacy Policy Content */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative space-y-12">
                        {/* Section 1: Who We Are */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">1. Who We Are</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We are an international virtual counseling and emotional wellness platform providing services to clients across multiple countries.
                                </p>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    We are committed to protecting your personal information and maintaining confidentiality.
                                </p>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    If you have questions about this Policy, you may contact us at:
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

                        {/* Section 2: Information We Collect */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">2. Information We Collect</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    We collect the following types of information when you visit our website, fill a form, or use our services:
                                </p>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.1 Personal Information</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            This includes data you voluntarily provide, such as:
                                        </p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>Full name</li>
                                            <li>Phone number</li>
                                            <li>Email address</li>
                                            <li>Country/location</li>
                                            <li>Payment details (processed securely through third-party providers)</li>
                                            <li>Information shared during session requests or inquiries</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.2 Sensitive Information (Counseling Data)</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            This includes emotional or relationship concerns, intake details, or information shared during sessions.
                                        </p>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            We treat all counseling-related information with strict confidentiality.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.3 Usage Data</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            Automatically collected information through cookies and analytics tools:
                                        </p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>IP address</li>
                                            <li>Browser type</li>
                                            <li>Device information</li>
                                            <li>Pages visited</li>
                                            <li>Time spent on the website</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.4 Payment Information</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            Payments are processed securely through trusted third-party gateways (e.g., Paystack).
                                        </p>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            We do not store your full card details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 3: How We Use Your Information */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">3. How We Use Your Information</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We use the collected information to:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Provide counseling and support services</li>
                                    <li>Manage bookings and communication</li>
                                    <li>Process payments securely</li>
                                    <li>Improve website performance and user experience</li>
                                    <li>Personalize your experience</li>
                                    <li>Send service updates, confirmations, and responses</li>
                                    <li>Maintain internal records and quality assurance</li>
                                    <li>Ensure the safety and integrity of our platform</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We do not sell, rent, or trade your personal information to third parties.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 4: Confidentiality & Counseling Information */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">4. Confidentiality & Counseling Information</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    All conversations, messages, and counseling notes are kept strictly confidential.
                                </p>
                                <p className="mb-2 font-semibold text-slate-900">We only disclose such information when:</p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>You give explicit written permission</li>
                                    <li>There is risk of harm to yourself or others</li>
                                    <li>There is suspected abuse or neglect</li>
                                    <li>We are required by law, court order, or regulatory authorities</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We adhere to ethical standards for virtual counseling and data protection.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 5: Cookies & Tracking Technologies */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">5. Cookies & Tracking Technologies</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We use cookies to:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Improve website navigation and performance</li>
                                    <li>Understand visitor behavior</li>
                                    <li>Personalize content</li>
                                    <li>Track analytics</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    You may disable cookies through your browser settings, though some features may not function properly.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 6: Third-Party Sharing */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">6. Third-Party Sharing</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We may share limited necessary information with:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Payment processors (for secure payments)</li>
                                    <li>Email and communication service providers</li>
                                    <li>Analytics tools (e.g., Google Analytics)</li>
                                    <li>Cloud hosting providers</li>
                                </ul>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    These third parties must protect your data and are not permitted to use it for any other purpose.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We do not share counseling session content with any third-party organization.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 7: Data Protection & Security */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">7. Data Protection & Security</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We implement strong technical and organizational measures to safeguard your data, including:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Encrypted communication</li>
                                    <li>Secure data storage</li>
                                    <li>Restricted staff access</li>
                                    <li>Regular security audits</li>
                                    <li>Compliance with applicable data protection regulations</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    While we take all appropriate steps, no online system is 100% secure.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 8: Your Rights */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">8. Your Rights</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Depending on your country or region, you have the right to:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Access your personal information</li>
                                    <li>Request corrections or updates</li>
                                    <li>Request the deletion of your data</li>
                                    <li>Withdraw consent</li>
                                    <li>Object to processing</li>
                                    <li>Request copies of your stored data</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    To make any request, contact us at the email provided.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 9: Data Retention */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">9. Data Retention</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We retain your data only as long as necessary for:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Fulfilling the purposes outlined in this policy</li>
                                    <li>Legal compliance</li>
                                    <li>Professional record-keeping standards</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    You may request deletion of your data at any time (unless legally prohibited).
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 10: Payment Processing */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">10. Payment Processing</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    All payments are securely processed in Ghanaian Cedis (GHS) via Paystack.
                                </p>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Your bank handles currency conversion.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We do not store full card data.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 11: Children's Privacy */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">11. Children&apos;s Privacy</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Our services are intended for individuals 18 and above.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Clients under 18 may only use our services with verified parental or guardian consent.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 12: International Data Transfers */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">12. International Data Transfers</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Because we serve clients globally, your data may be processed in different countries.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We ensure that all transfers comply with applicable data protection laws and security standards.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 13: Updates to This Privacy Policy */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">13. Updates to This Privacy Policy</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We may update this policy occasionally.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    When changes are made, the &quot;Last Updated&quot; date will be revised.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Continued use of our website or services indicates acceptance of the updated policy.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 14: Contact Us */}
                        <Reveal>
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-slate-900">14. Contact Us</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    If you have questions, concerns, or requests regarding your privacy, please contact:
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

