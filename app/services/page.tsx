"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

const services = [
    {
        id: 1,
        title: "Individual Counseling",
        subtitle: "For those seeking clarity, healing, and personal growth.",
        description:
            "Life can feel overwhelming, uncertain, or heavy—and sometimes you just need a safe space to breathe, talk, and make sense of things.",
        benefits: [
            "Work through stress, anxiety, and emotional fatigue",
            "Heal from personal trauma or heartbreak",
            "Build healthy coping strategies",
            "Reconnect with your sense of self",
            "Navigate life transitions",
            "Break unhealthy patterns",
        ],
        note: "Every session is tailored to your pace, your story, and the outcomes you desire.",
        image: "/images/services/teenCounsel.jpg",
        color: "from-purple-500 to-indigo-600",
    },
    {
        id: 2,
        title: "Couples Counseling",
        subtitle: "For couples who want to rebuild trust, deepen connection, or rediscover partnership.",
        description:
            "Relationships can be beautiful—but they can also be complicated. Whether you're dating, engaged, married, or rebuilding, we help partners:",
        benefits: [
            "Improve communication",
            "Address conflict with respect and understanding",
            "Heal after betrayal",
            "Strengthen intimacy and emotional closeness",
            "Create shared goals and expectations",
        ],
        note: "Our role is not to take sides, but to guide both partners toward a healthier, more intentional relationship.",
        image: "/images/services/couples.png",
        color: "from-pink-500 to-rose-600",
    },
    {
        id: 3,
        title: "Family Therapy",
        subtitle: "For families seeking unity, understanding, and healthier communication.",
        description:
            "Families face different pressures—generational differences, emotional wounds, misunderstandings, transitions, loss, and more.",
        benefits: [
            "Resolve long-standing conflicts",
            "Improve communication between family members",
            "Support parents and children through emotional challenges",
            "Navigate blended family dynamics",
            "Build empathy and mutual respect",
        ],
        note: "Together, we help your family function as a stronger, more connected unit.",
        image: "/images/services/marriage.png",
        color: "from-blue-500 to-cyan-600",
    },
    {
        id: 4,
        title: "Teen & Youth Counseling",
        subtitle: "For young people navigating identity, pressure, change, and emotional overwhelm.",
        description:
            "Adolescence is a tender, confusing stage. Many young people struggle in silence—afraid to speak, unsure of how to express themselves.",
        benefits: [
            "Build confidence and self-awareness",
            "Address peer pressure, bullying, or social anxiety",
            "Manage academic stress",
            "Process difficult emotions",
            "Strengthen communication with parents",
        ],
        note: "We empower young people to find their voice in a world that often tells them to stay silent.",
        image: "/images/services/teenPhysical.jpg",
        color: "from-yellow-400 to-orange-500",
    },
    {
        id: 5,
        title: "Trauma-Informed Therapy",
        subtitle: "For those healing from difficult, painful, or life-altering experiences.",
        description:
            "Trauma changes how you think, feel, and see the world. Our specialized trauma support is gentle, patient, and deeply respectful.",
        benefits: [
            "Safely explore and release emotional wounds",
            "Rebuild a sense of safety and control",
            "Understand and manage triggers",
            "Reduce hypervigilance and emotional numbness",
            "Begin the journey from surviving to living",
        ],
        note: "Your story is valid, and your healing matters.",
        image: "/images/services/grief.jpg",
        color: "from-teal-500 to-emerald-600",
    },
    {
        id: 6,
        title: "Grief & Loss Support",
        subtitle: "For anyone processing the pain of losing someone or something important.",
        description:
            "Loss takes many forms—death, separation, broken relationships, missed opportunities, or identity shifts. Grief is not linear, and you don't have to endure it alone.",
        benefits: [
            "Understand your grieving process",
            "Manage emotional waves and triggers",
            "Honor your loss with compassion",
            "Find hope, meaning, and strength again",
        ],
        note: "You deserve space to heal, remember, and rebuild.",
        image: "/images/services/groupCounsel.jpg",
        color: "from-violet-500 to-purple-600",
    },
    {
        id: 7,
        title: "Mental Health Coaching & Emotional Wellness",
        subtitle: "For individuals seeking guidance, stability, and everyday emotional support.",
        description:
            "These sessions provide ongoing, structured support for stress management, emotional regulation, and building mental resilience.",
        benefits: [
            "Stress management",
            "Emotional regulation",
            "Self-reflection and lifestyle adjustments",
            "Building mental resilience",
            "Achieving personal goals",
        ],
        note: "Think of this as having a trusted partner for your emotional well-being.",
        image: "/images/services/personalCounsel.jpg",
        color: "from-indigo-500 to-blue-600",
    },
    {
        id: 8,
        title: "Workshops, Masterclasses & Group Support",
        subtitle: "For those who thrive in shared learning and community environments.",
        description:
            "We conduct transformative sessions on self-esteem, mindfulness, healthy relationships, and personal growth.",
        benefits: [
            "Self-esteem and confidence building",
            "Mindfulness and emotional regulation",
            "Healthy relationships",
            "Coping with stress and burnout",
            "Personal growth and intentional living",
        ],
        note: "Whether in-person or virtual, these sessions offer community, insight, and practical tools.",
        image: "/images/services/mental.jpg",
        color: "from-rose-500 to-pink-600",
    },
];

const deliveryMethods = [
    {
        title: "Confidential Online/Virtual counseling",
        description: "Secure video sessions from the comfort of your space",
        icon: "💻",
    },
    {
        title: "Phone sessions",
        description: "Flexible voice-only sessions when you prefer audio",
        icon: "📞",
    },
    {
        title: "Group therapy rooms and safe spaces",
        description: "Community support in structured group settings",
        icon: "👥",
    },
];

export default function ServicesPage() {
    return (
        <div className="relative isolate overflow-hidden" style={{ marginTop: "-87px" }}>
            {/* Hero Section with Image Background */}
            <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Compassionate Support"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/90 via-brand-purple-light/80 to-brand-purple/90" />
                </div>
                <div className="relative z-10 flex h-full items-center">
                    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                                SERVICES
                            </p>
                            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                                Compassionate Support for Every Step of Your Journey
                            </h1>
                            <p className="mb-4 text-lg leading-relaxed text-white/95 sm:text-xl">
                                At the heart of our work is a simple belief: no one should have to navigate life&apos;s hardest moments
                                alone.
                            </p>
                            <p className="text-base text-white/90 sm:text-lg">
                                Each session is confidential, judgment-free, and delivered by trained, empathetic counselors who truly
                                listen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
                {/* Services - Creative Staggered Layout */}
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative space-y-8">
                        {services.map((service, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <Reveal key={service.id} delay={index * 0.1}>
                                    <div
                                        className={`group relative overflow-hidden rounded-3xl shadow-xl transition-all hover:shadow-2xl ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                            } flex flex-col`}
                                    >
                                        {/* Image Section - Larger and More Prominent */}
                                        <div className="relative h-80 w-full md:h-auto md:w-2/5">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-brand-purple shadow-lg">
                                                        {service.id}
                                                    </span>
                                                    <h2 className="text-2xl font-bold text-white sm:text-3xl">{service.title}</h2>
                                                </div>
                                                <p className="text-base font-medium text-white/95">{service.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex flex-1 flex-col justify-center bg-white p-8 md:p-10">
                                            <p className="mb-6 text-base leading-relaxed text-slate-700">{service.description}</p>
                                            <div className="mb-6 grid gap-3 sm:grid-cols-2">
                                                {service.benefits.map((benefit, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple">
                                                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm text-slate-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="rounded-xl border-l-4 border-brand-purple bg-purple-50/50 p-4">
                                                <p className="text-sm italic text-slate-700">{service.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* How We Deliver - Creative Card Layout */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <SectionHeader
                            eyebrow="How We Deliver Our Services"
                            title="We offer flexible, accessible options for your comfort"
                            copy="We meet you where you feel safest."
                            align="center"
                        />
                        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
                            {deliveryMethods.map((method, index) => (
                                <Reveal key={method.title} delay={index * 0.1}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-purple-200 bg-white p-8 text-center transition-all hover:border-brand-purple hover:shadow-xl">
                                        <div className="mb-4 text-5xl">{method.icon}</div>
                                        <h3 className="mb-3 text-xl font-semibold text-slate-900">{method.title}</h3>
                                        <p className="flex-1 text-sm text-slate-600">{method.description}</p>
                                        <div className="absolute inset-0 bg-linear-to-br from-brand-purple/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section - Full Width with Background */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-brand-purple p-12 md:p-16">
                            <div className="absolute right-0 top-0 -translate-y-10 translate-x-10 text-9xl font-bold text-white/10">
                                HEAL
                            </div>
                            <Reveal>
                                <div className="relative flex flex-col items-center gap-6 text-center">
                                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                        Your Healing Starts Here
                                    </h2>
                                    <p className="max-w-2xl text-lg leading-relaxed text-white/95">
                                        Whether you are hurting, confused, hopeful, or simply seeking guidance, we are here to walk with
                                        you—gently, respectfully, and without judgment.
                                    </p>
                                    <p className="text-xl font-semibold text-white">
                                        Healing is possible. Growth is possible. You don&apos;t have to do it alone.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-4">
                                        <Link
                                            href="/booking"
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-purple shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            Book a Session
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold !text-white transition hover:bg-white/10"
                                        >
                                            Get in Touch
                                        </Link>
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
