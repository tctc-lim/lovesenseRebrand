"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

const whyChooseUs = [
    {
        number: "1",
        title: "Warm, Human Conversations",
        description: "No pressure, no judgment — just real conversations that help you feel understood.",
    },
    {
        number: "2",
        title: "Affordable Support",
        description: "We believe therapy should be accessible, so our pricing is designed to accommodate clients across different countries.",
    },
    {
        number: "3",
        title: "Therapy Anytime, Anywhere",
        description: "No clinic visits. No waiting rooms. Your counselor is available 24/7 — right from your phone or laptop.",
    },
    {
        number: "4",
        title: "Professional, Trained Counselors",
        description: "All our counselors are carefully selected, well-trained, and experienced in helping clients navigate emotional, mental, and relationship challenges.",
    },
    {
        number: "5",
        title: "Global Reach",
        description: "Wherever you are, we&apos;re there for you. Love Sense supports clients across several continents and time zones.",
    },
];

const whatWeHelpWith = [
    "Understand your emotions",
    "Strengthen your relationships",
    "Develop healthier patterns",
    "Heal from painful experiences",
    "Build confidence and self-awareness",
    "Improve communication and conflict resolution",
];

const serviceTypes = [
    {
        title: "Individuals",
        image: "/images/services/oneOnOne.jpg",
        description: "Personal one-on-one counseling sessions tailored to your unique needs.",
    },
    {
        title: "Couples",
        image: "/images/services/couples.png",
        description: "Relationship counseling to strengthen your bond and improve communication.",
    },
    {
        title: "Pre-marriage and married partners",
        image: "/images/services/doublecouple.png",
        description: "Support for couples at any stage of their relationship journey.",
    },
    {
        title: "People dealing with emotional distress, anxiety, heartbreak, grief, or relationship issues",
        image: "/images/services/personalCounsel.jpg",
        description: "Compassionate support for those navigating difficult emotional challenges.",
    },
];

export default function AboutPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleScroll = () => {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = carousel.offsetWidth;

            // Calculate which card is most visible
            let newIndex = 0;
            let minDistance = Infinity;

            cardRefs.current.forEach((card, index) => {
                if (card) {
                    const cardLeft = card.offsetLeft - carousel.offsetLeft;
                    const cardCenter = cardLeft + card.offsetWidth / 2;
                    const scrollCenter = scrollLeft + cardWidth / 2;
                    const distance = Math.abs(cardCenter - scrollCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        newIndex = index;
                    }
                }
            });

            setActiveIndex(newIndex);
        };

        carousel.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
            carousel.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToCard = (index: number) => {
        const card = cardRefs.current[index];
        const carousel = carouselRef.current;
        if (card && carousel) {
            const cardLeft = card.offsetLeft - carousel.offsetLeft;
            carousel.scrollTo({
                left: carousel.scrollLeft + cardLeft - carousel.offsetWidth / 2 + card.offsetWidth / 2,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative isolate overflow-hidden">
            <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
                {/* Hero Section - Who We Are */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <SectionHeader
                            eyebrow="About Us"
                            title="Who We Are"
                            copy="Love Sense is an international virtual counseling company dedicated to helping individuals and couples find clarity, healing, and emotional balance from the comfort of their own space."
                            align="center"
                        />
                        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Left Column - Text Content */}
                            <Reveal>
                                <div className="flex h-full flex-col justify-center space-y-4">
                                    <p className="text-base leading-relaxed text-slate-700">
                                        We understand that life can become overwhelming — relationships get complicated, emotions become heavy,
                                        and sometimes you just need a safe place to talk, breathe, and be heard.
                                    </p>
                                    <p className="text-lg font-semibold text-brand-purple">That is what we provide.</p>
                                    <p className="text-base leading-relaxed text-slate-700">
                                        Through warm, confidential, and non-judgmental conversations, our professional counselors walk with you
                                        through your challenges and guide you toward a healthier, happier version of yourself.
                                    </p>
                                    <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50/50 p-4">
                                        <p className="text-sm font-semibold text-slate-900">We currently serve clients in:</p>
                                        <p className="mt-2 text-sm text-slate-700">
                                            Ghana, USA, Nigeria, UK, UAE, Kenya, Rwanda, Botswana, France, Canada, China, Russia, and more.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Right Column - Image with Overlaid Cards */}
                            <Reveal>
                                <div className="relative h-[500px] overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-xl lg:h-[600px]">
                                    {/* Main Image */}
                                    <Image
                                        src="/images/services/happyCounselor.jpg"
                                        alt="Love Sense team and clients"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Overlaid Cards */}
                                    {/* Market Statistic Card */}
                                    <div className="absolute bottom-20 left-4 w-48 rounded-xl bg-white p-4 shadow-lg">
                                        <div className="mb-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                            Client Growth
                                        </div>
                                        <div className="mb-2 space-y-1 text-sm text-slate-600">
                                            <div>-User Growth</div>
                                            <div>-Overview</div>
                                        </div>
                                        <div className="mt-3 h-16 w-full">
                                            {/* Simple line graph representation */}
                                            <svg className="h-full w-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                                                <polyline
                                                    points="0,50 30,45 60,40 90,35 120,38 150,30 180,25 200,20"
                                                    fill="none"
                                                    stroke="#662d91"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Task Card 1 */}
                                    <div className="absolute left-4 top-4 w-56 rounded-xl bg-white p-4 shadow-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                                                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900">Complete counseling session</p>
                                                <p className="mt-1 text-xs text-slate-500">09:30 - 10:40 AM (GMT)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task Card 2 */}
                                    <div className="absolute left-4 top-24 w-56 rounded-xl bg-white p-4 shadow-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                                                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-2 w-full rounded bg-slate-200">
                                                    <div className="h-full w-3/4 rounded bg-brand-purple"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Subscribe Card */}
                                    <div className="absolute bottom-4 right-4 w-40 rounded-xl bg-white p-4 shadow-lg">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="h-3 w-3 rounded bg-green-500"></div>
                                                <div className="h-3 w-3 rounded bg-orange-500"></div>
                                                <div className="h-3 w-3 rounded bg-blue-500"></div>
                                                <div className="h-3 w-3 rounded bg-pink-500"></div>
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium text-slate-600">Total Clients</p>
                                        <p className="text-2xl font-bold text-slate-900">5,000+</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative grid gap-8 md:grid-cols-2 md:items-stretch">
                        <Reveal>
                            <div className="flex h-full flex-col rounded-3xl border border-purple-200 bg-white p-8 shadow-md">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-4 text-2xl font-semibold text-slate-900">Our Mission</h2>
                                <p className="flex-1 text-base leading-relaxed text-slate-700">
                                    To provide accessible, affordable, and compassionate emotional support to anyone, anywhere — and to help
                                    people heal through genuine human connection, understanding, and evidence-based counseling.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal>
                            <div className="flex h-full flex-col rounded-3xl border border-purple-200 bg-white p-8 shadow-md">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple-light">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-4 text-2xl font-semibold text-slate-900">Our Vision</h2>
                                <p className="flex-1 text-base leading-relaxed text-slate-700">
                                    A world where everyone has access to quality emotional support, strong relationships, and a healthy mind —
                                    regardless of their location, schedule, or background.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* What We Do */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <SectionHeader
                            eyebrow="What We Do"
                            title="At Love Sense, we offer virtual counseling services for:"
                            copy="Our sessions are conversational, practical, and centered around your growth."
                            align="center"
                        />
                        {/* Carousel Container */}
                        <div className="mt-12 relative">
                            <div className="overflow-hidden rounded-3xl">
                                <div
                                    ref={carouselRef}
                                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                                >
                                    {serviceTypes.map((service, index) => (
                                        <Reveal key={service.title} delay={index * 0.1}>
                                            <div
                                                ref={(el) => {
                                                    cardRefs.current[index] = el;
                                                }}
                                                className="relative min-w-[400px] md:min-w-[450px] lg:min-w-[500px] snap-center"
                                            >
                                                <div className="relative h-[250px] md:h-[300px] overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                                    {/* Image - Full Height */}
                                                    <Image
                                                        src={service.image}
                                                        alt={service.title}
                                                        fill
                                                        className="object-cover"
                                                    />

                                                    {/* Overlay for bottom right text area */}
                                                    <div className="absolute bottom-0 right-0 w-3/4 md:w-2/3 h-1/4 bg-linear-to-tl from-black/80 via-black/40 to-transparent rounded-tl-2xl" />

                                                    {/* Title Overlay on Image - Bottom Right */}
                                                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 max-w-[70%]">
                                                        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                                            {service.title}
                                                        </h3>
                                                    </div>

                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                            <div className="mt-4 flex justify-center gap-2">
                                {serviceTypes.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToCard(index)}
                                        className={`h-2 rounded-full transition-all ${activeIndex === index
                                            ? "w-8 bg-brand-purple"
                                            : "w-2 bg-brand-purple/30 hover:bg-brand-purple/50"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 rounded-3xl border border-purple-200 bg-purple-50/50 p-8">
                            <h3 className="mb-6 text-center text-xl font-semibold text-slate-900">
                                We help you:
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {whatWeHelpWith.map((item, index) => (
                                    <Reveal key={item} delay={index * 0.05}>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple">
                                                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-slate-700">{item}</span>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                            <p className="mt-8 text-center text-base font-semibold text-brand-purple">
                                We don&apos;t just counsel you — we walk the journey with you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Counseling Approach */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <div className="rounded-3xl border-2 border-purple-100 bg-purple-50/30 p-8 md:p-12">
                                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-stretch">
                                    {/* Left Column - Text Content */}
                                    <div className="flex flex-col justify-center space-y-6">
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                            Our Counseling Approach
                                        </h2>
                                        <p className="text-base leading-relaxed text-slate-700">
                                            We use an integrative method designed to meet you exactly where you are.
                                            Our skilled counselors combine approaches such as:

                                        </p>

                                        {/* Therapy Approaches in Two Columns */}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {[
                                                "Person-Centered Therapy",
                                                "Cognitive Behavioral Therapy (CBT)",
                                                "Emotion-Focused Therapy (EFT)",
                                                "Task-Centered Competency-Based Therapy (TCBT)",
                                                "Feedback Informed Therapy (FIT)",
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple">
                                                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-lg font-semibold text-brand-purple pt-4">
                                            Our goal is simple: To help you heal in a way that feels natural, safe, and tailored to your unique needs.
                                        </p>
                                    </div>

                                    {/* Right Column - Image */}
                                    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-full lg:min-h-full">
                                        <Image
                                            src="/images/services/approach2.png"
                                            alt="Love Sense Counselor"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Why Clients Choose Love Sense */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <SectionHeader
                            eyebrow="Why Clients Choose Love Sense"
                            title="What makes us different"
                            copy="Five reasons why people trust us with their healing journey."
                            align="center"
                        />
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:items-stretch">
                            {whyChooseUs.map((item) => (
                                <Reveal key={item.number}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-purple-200 bg-linear-to-br from-purple-50 to-indigo-50 p-8 transition hover:border-purple-300 hover:shadow-lg">
                                        <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 text-7xl font-bold text-purple-100 transition group-hover:text-purple-200">
                                            {item.number}
                                        </div>
                                        <div className="relative flex flex-1 flex-col">
                                            <h3 className="mb-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="flex-1 text-base text-slate-700">{item.description}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Important Note */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="rounded-3xl border-2 border-red-200 bg-red-50/50 p-8">
                            <h3 className="mb-4 text-xl font-semibold text-red-900">A Gentle But Important Note</h3>
                            <p className="text-base leading-relaxed text-red-800">
                                Love Sense is not a medical or psychiatric clinic and does not provide clinical or emergency mental health
                                services. We focus on talk therapy and emotional support.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Promise */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="relative rounded-3xl border border-purple-200 bg-brand-purple overflow-hidden p-12 md:p-16">
                            {/* Blurry Background Overlay */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

                            <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
                                {/* Left Column - Text Content */}
                                <Reveal>
                                    <div className="flex flex-col space-y-6 text-white">
                                        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Our Promise to You</h2>
                                        <div className="space-y-3 text-lg text-white/95">
                                            <p>We promise to listen.</p>
                                            <p>To support you.</p>
                                            <p>To guide you with compassion.</p>
                                            <p>To help you grow.</p>
                                            <p className="mt-6 font-semibold">
                                                And to walk with you until you become the healthiest version of yourself — emotionally, mentally, and
                                                relationally.
                                            </p>
                                        </div>
                                        <p className="text-xl font-semibold text-white">
                                            At Love Sense, your healing begins with a conversation.
                                        </p>
                                        <div className="pt-4">
                                            <Link
                                                href="/booking"
                                                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-purple shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                                            >
                                                Start Your Journey
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>

                                {/* Right Column - Image */}
                                <Reveal>
                                    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-full lg:min-h-[500px]">
                                        <Image
                                            src="/images/services/smiling-man.png"
                                            alt="Love Sense Promise"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
