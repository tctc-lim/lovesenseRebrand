"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

export default function TermsOfServicePage() {
    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Terms of Service"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Terms of Service</h1>
                    <p className="text-lg text-white/90 sm:text-xl">Last updated: 2025</p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* Introduction */}
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                                Welcome to our website. By accessing or using our services, you agree to the following Terms of Service. Please read them carefully before using our platform or booking a session.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative space-y-12">
                        {/* Section 1: Overview */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">1. Overview</h2>
                                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                                    <p>
                                        These Terms of Service (&quot;Terms&quot;) govern your use of our website, counseling services, resources, and communication channels (collectively referred to as the &quot;Services&quot;).
                                    </p>
                                    <ul className="ml-6 list-disc space-y-2">
                                        <li>By accessing our website or booking any session, you acknowledge that you have read, understood, and agreed to be bound by these Terms.</li>
                                        <li>If you do not agree, please discontinue use of the site and services immediately.</li>
                                    </ul>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 2: Eligibility */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">2. Eligibility</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    To access or use our Services, you must:
                                </p>
                                <ul className="ml-6 mb-6 list-disc space-y-2 text-base text-slate-700">
                                    <li>Be at least 18 years old</li>
                                    <li>Have the legal capacity to enter into a binding agreement</li>
                                    <li>Provide accurate and truthful information when booking or communicating</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    <strong>For minors below 18, parental or guardian consent is required for all counseling services.</strong>
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 3: Nature of Services */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">3. Nature of Services</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We provide emotional wellness services, counseling, mental health coaching, and therapeutic support.
                                </p>
                                <p className="mb-4 font-semibold text-slate-900">Our services:</p>
                                <ul className="ml-6 mb-6 list-disc space-y-2 text-base text-slate-700">
                                    <li>Do not replace medical treatment</li>
                                    <li>Do not include prescribing medication</li>
                                    <li>They are not intended for crisis, emergency, or life-threatening situations</li>
                                </ul>
                                <p className="text-base font-semibold leading-relaxed text-red-700">
                                    If you are in crisis or experiencing an emergency, please contact your local emergency services immediately.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 4: Booking & Appointments */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">4. Booking & Appointments</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">4.1 Scheduling</h3>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            Sessions can be booked through our website, email, or approved communication channels. You will receive a confirmation once the booking is processed.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">4.2 Cancellation & Rescheduling</h3>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            To cancel or reschedule, you must notify us at least 24 hours before your appointment.
                                        </p>
                                        <p className="mt-2 text-base leading-relaxed text-slate-700">
                                            Late cancellations or missed sessions may attract a fee at our discretion.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold text-slate-900">4.3 Session Duration</h3>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            Standard session times range between 50–60 minutes, unless otherwise stated.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 5: Payment Terms */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">5. Payment Terms</h2>
                                <ul className="ml-6 space-y-2 text-base leading-relaxed text-slate-700">
                                    <li>All fees must be paid before or immediately after a session, depending on the payment structure.</li>
                                    <li>We accept approved payment methods listed on our website.</li>
                                    <li>Fees are non-refundable except under circumstances clearly stated in our refund or cancellation policy (if applicable).</li>
                                    <li>We reserve the right to modify pricing at any time, with updates displayed on our website.</li>
                                </ul>
                            </div>
                        </Reveal>

                        {/* Section 6: Confidentiality */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">6. Confidentiality</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    All client information shared during sessions is confidential and protected.
                                </p>
                                <p className="mb-2 font-semibold text-slate-900">Exceptions to confidentiality include:</p>
                                <ul className="ml-6 mb-4 space-y-2 text-base text-slate-700">
                                    <li>Risk of harm to yourself or others</li>
                                    <li>Suspected abuse or neglect of minors or vulnerable individuals</li>
                                    <li>Legal requirements, such as court orders</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We handle all personal data in accordance with our Privacy Policy.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 7: Client Responsibilities */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">7. Client Responsibilities</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    By using our Services, you agree to:
                                </p>
                                <ul className="ml-6 mb-4 space-y-2 text-base text-slate-700">
                                    <li>Provide accurate and honest information during sessions</li>
                                    <li>Attend sessions on time</li>
                                    <li>Use the Services respectfully and lawfully</li>
                                    <li>Do not misuse or exploit our content, counselors, or communication channels</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We reserve the right to discontinue services for clients who violate these expectations.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 8: Professional Boundaries */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">8. Professional Boundaries</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    To maintain ethical standards, you agree not to:
                                </p>
                                <ul className="ml-6 mb-4 space-y-2 text-base text-slate-700">
                                    <li>Request activities outside the counselor&apos;s professional scope</li>
                                    <li>Develop personal, romantic, or financial relationships with counselors</li>
                                    <li>Record sessions without explicit permission</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    All interactions must remain professional and aligned with best-practice guidelines.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 9: Website Use */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">9. Website Use</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    You agree not to:
                                </p>
                                <ul className="ml-6 mb-4 space-y-2 text-base text-slate-700">
                                    <li>Copy or misuse of website content</li>
                                    <li>Attempt unauthorized access to website systems</li>
                                    <li>Upload harmful software or conduct disruptive activities</li>
                                    <li>Use the website for unlawful purposes</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    All intellectual property, including text, images, branding, and digital content, remains the sole property of the organization.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 10: Disclaimer of Warranties */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">10. Disclaimer of Warranties</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Our Services are provided &quot;as is&quot; and &quot;as available&quot;.
                                </p>
                                <p className="mb-2 font-semibold text-slate-900">We do not guarantee:</p>
                                <ul className="ml-6 mb-4 space-y-2 text-base text-slate-700">
                                    <li>That the website will be uninterrupted or error-free</li>
                                    <li>That the outcomes of counseling will meet specific expectations</li>
                                    <li>That all content is free from inaccuracies or omissions</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Counseling and emotional wellness outcomes vary from person to person.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 11: Limitation of Liability */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">11. Limitation of Liability</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    To the fullest extent permitted by law:
                                </p>
                                <ul className="ml-6 space-y-2 text-base text-slate-700">
                                    <li>We are not liable for indirect, incidental, or consequential damages arising from the use of our Services</li>
                                    <li>We are not responsible for decisions you make based on counseling sessions or website content</li>
                                    <li>Our total liability will not exceed the amount paid for the service in question</li>
                                </ul>
                            </div>
                        </Reveal>

                        {/* Section 12: External Links */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">12. External Links</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Our website may include links to external websites.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We do not control or endorse these third-party sites and are not responsible for their content or policies.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 13: Changes to Terms */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">13. Changes to Terms</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We may update these Terms at any time.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    When we do, we will revise the &quot;Last Updated&quot; date. Continued use of the website signifies acceptance of the updated Terms.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 14: Governing Law */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">14. Governing Law</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    These Terms are governed by the laws of [Insert Country/State].
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Any disputes will be resolved through amicable negotiation or in the appropriate courts within the jurisdiction.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 15: Contact Information */}
                        <Reveal>
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-slate-900">15. Contact Information</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    If you have questions or concerns about these Terms, please contact us at:
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
