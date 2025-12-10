"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

export default function RefundPolicyPage() {
    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Refund Policy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Refund Policy</h1>
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
                                We value every client who chooses our counseling services, and we strive to provide a smooth, supportive, and transparent experience. This Refund & Cancellation Policy explains how refunds, cancellations, and rescheduling work on our platform.
                            </p>
                            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
                                By booking a session, you agree to the terms outlined here.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Refund Policy Content */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative space-y-12">
                        {/* Section 1: Appointment Bookings */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">1. Appointment Bookings</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    All bookings made through our website, email, or approved communication channels are considered confirmed once payment is completed.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    You will receive a confirmation message with your session details (date, time, and assigned counselor).
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 2: Cancellation Policy */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">2. Cancellation Policy</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.1 Client Cancellations</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            If you need to cancel your session:
                                        </p>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            Cancel at least 24 hours before your appointment to receive either:
                                        </p>
                                        <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                            <li>A full refund OR</li>
                                            <li>A free reschedule (no penalty)</li>
                                        </ul>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            Cancellations made within 24 hours of the session time are not eligible for a refund.
                                        </p>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            This is because a counselor has already reserved time for you, and last-minute cancellations prevent us from offering the slot to someone else.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.2 No-Show Policy</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            A &quot;no-show&quot; means you do not attend your session and do not notify us ahead of time.
                                        </p>
                                        <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                            <li>No-shows are not eligible for refunds.</li>
                                            <li>You will need to book a new session if you wish to continue services.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">2.3 Rescheduling</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            You may reschedule a session once for free if you notify us at least 24 hours in advance.
                                        </p>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            Multiple reschedule requests may incur additional fees.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 3: Refund Eligibility */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">3. Refund Eligibility</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    Refunds may be issued only in the following situations:
                                </p>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">3.1 Eligible Situations</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            You may request a refund if:
                                        </p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>You cancel at least 24 hours before the session</li>
                                            <li>You booked the same session twice by mistake</li>
                                            <li>A technical issue on our side prevented the session from happening</li>
                                            <li>Your assigned counselor failed to attend the session</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">3.2 Non-Eligible Situations</h3>
                                        <p className="mb-4 text-base leading-relaxed text-slate-700">
                                            Refunds will not be granted for:
                                        </p>
                                        <ul className="ml-6 list-disc space-y-2 text-base text-slate-700">
                                            <li>Missed sessions (&quot;no-shows&quot;)</li>
                                            <li>Cancellations within 24 hours</li>
                                            <li>Dissatisfaction due to outcomes or expectations—therapy results vary</li>
                                            <li>Completed sessions</li>
                                            <li>Interruptions caused by the client&apos;s internet or device failure</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Section 4: Processing Refunds */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">4. Processing Refunds</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Refunds are processed through the same payment method used at booking.
                                </p>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Refunds will be processed within 7–14 business days, depending on your bank.
                                </p>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    Because all payments are processed in Ghanaian Cedis (GHS) through Paystack, exchange rates may affect the final returned amount.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We are not responsible for currency conversion differences or foreign transaction fees charged by your bank.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 5: Package Sessions & Multi-Session Purchases */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">5. Package Sessions & Multi-Session Purchases</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    If you purchased a package (multiple sessions):
                                </p>
                                <ul className="ml-6 space-y-2 text-base text-slate-700">
                                    <li>Refunds apply only to unused sessions</li>
                                    <li>Completed sessions are non-refundable</li>
                                    <li>Packages discounted as a bundle may be recalculated at the original per-session rate upon refund</li>
                                </ul>
                            </div>
                        </Reveal>

                        {/* Section 6: Counselor Changes */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">6. Counselor Changes</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We reserve the right to change or reassign your counselor in cases of:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>Emergency</li>
                                    <li>Scheduling conflict</li>
                                    <li>Illness</li>
                                    <li>Staff restructuring</li>
                                </ul>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    You may request a counselor change if you&apos;re not comfortable, but this does not qualify for a refund.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    We will make every effort to accommodate your preferences.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 7: Technical Issues */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">7. Technical Issues</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    If a session fails due to a system error, platform failure, or counselor connection issue:
                                </p>
                                <ul className="ml-6 mb-4 list-disc space-y-2 text-base text-slate-700">
                                    <li>The session will be rescheduled at no extra cost</li>
                                    <li>If rescheduling is not possible, a refund may be issued</li>
                                </ul>
                                <p className="text-base leading-relaxed text-slate-700">
                                    If the issue is on the client&apos;s side (e.g., poor internet, device failure), refunds are not provided.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 8: Disputes & Special Circumstances */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">8. Disputes & Special Circumstances</h2>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    We strive to be fair and compassionate.
                                </p>
                                <p className="mb-6 text-base leading-relaxed text-slate-700">
                                    If you believe you deserve a refund outside the standard policy, contact us and we will review your case individually.
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
                                <p className="mt-6 text-base leading-relaxed text-slate-700">
                                    All decisions made after review are final.
                                </p>
                            </div>
                        </Reveal>

                        {/* Section 9: Policy Updates */}
                        <Reveal>
                            <div>
                                <h2 className="mb-4 text-3xl font-bold text-slate-900">9. Policy Updates</h2>
                                <p className="mb-4 text-base leading-relaxed text-slate-700">
                                    We may update this Refund Policy occasionally.
                                </p>
                                <p className="text-base leading-relaxed text-slate-700">
                                    Continued use of our website or services means you accept the latest version.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </div>
    );
}
