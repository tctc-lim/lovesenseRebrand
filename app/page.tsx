"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { HeroSlider } from "@/components/HeroSlider";
import { FloatingElements } from "@/components/FloatingElements";
import { SectionBubbles } from "@/components/SectionBubbles";
import { services } from "@/lib/services";

const therapyApproaches = [
  {
    title: "Person-Centered Therapy",
    description: "A compassionate approach that meets you where you are with calm, non-judgmental listening.",
  },
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description: "Evidence-based techniques to help you identify and change negative thought patterns.",
  },
  {
    title: "Emotion-Focused Therapy (EFT)",
    description: "Helps you understand and process emotions to improve relationships and emotional well-being.",
  },
  {
    title: "Task-Centered Competency-Based Therapy (TCBT)",
    description: "Focused, goal-oriented sessions that build practical skills for real-world challenges.",
  },
  {
    title: "Feedback Informed Therapy (FIT)",
    description: "We adapt our approach based on your feedback to ensure the best outcomes for you.",
  },
];

const whyChooseUs = [
  {
    number: "01",
    title: "Affordable Support",
    description: "We prioritize accessibility so that therapy is within reach for everyone.",
  },
  {
    number: "02",
    title: "On-Demand Assistance",
    description: "Talk to your counselor from anywhere, 24/7 — no travel, no waiting rooms.",
  },
  {
    number: "03",
    title: "Professional, Trained Counselors",
    description: "Compassionate experts who genuinely listen, understand, and guide you.",
  },
  {
    number: "04",
    title: "Judgment-Free Environment",
    description: "Your emotions are safe with us. Healing begins with openness.",
  },
];

const books = [
  {
    title: "How To Make Your Marriage Work",
    image: "/images/books/lovesense-book1.jfif",
    description: "A practical, comforting guide for couples who want to reconnect.",
    buyLink: "#",
  },
  {
    title: "How To Heal From Heartbreak & Be Whole Again",
    image: "/images/books/lovesense-book2.jfif",
    description: "Gentle steps to process pain, rebuild confidence, and move forward.",
    buyLink: "#",
  },
];

const testimonials = [
  {
    quote:
      "As a teenager, I felt alone and overwhelmed with school and family pressure. Love Sense matched me with a therapist who truly listened and helped me navigate my emotions. I now feel more confident and in control of my mental health.",
    name: "Zainab T., USA",
  },
  {
    quote:
      "My partner and I were on the verge of separation, but Love Sense saved our relationship. The sessions were eye-opening and helped us rebuild trust.",
    name: "David & Ama, Ghana",
  },
  {
    quote:
      "I was struggling with severe anxiety, and finding a therapist in Accra felt impossible. Love Sense changed everything! I can now have sessions anytime I need support.",
    name: "Stephen, Ghana",
  },
  {
    quote:
      "Affordable therapy that actually works! My therapist is always available when I need them. If you've been thinking about starting therapy, this is your sign!",
    name: "Emmanuel O., Nigeria",
  },
  {
    quote:
      "Losing my father was the hardest thing I've ever faced. Love Sense connected me with a grief counselor who guided me through the pain. Therapy was the best decision I ever made.",
    name: "Mwangi L., UK",
  },
];

const serviceImages = {
  "private-counseling": "/images/services/teenCounsel.jpg",
  "relationship-counseling": "/images/services/couples.png",
  "marriage-counseling": "/images/services/marriage.png",
};

export default function Home() {
  return (
    <>
      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Full-width edge-to-edge slider */}
      <HeroSlider />

      <div className="relative isolate overflow-hidden bg-white">
        {/* Promo strip */}
        <section className="bg-linear-to-r from-purple-50 to-indigo-50 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <h3 className="text-xl font-light text-slate-900">
              Brace yourself! You are in for an <span className="font-semibold text-brand-lemon">Experience!!</span>
            </h3>
            <Link
              href="#bookUs"
              className="inline-flex items-center rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold !text-white shadow-md shadow-purple-400/40 transition hover:opacity-90"
            >
              Book a session
            </Link>
          </div>
        </section>


        <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Our Services Section */}
          <section className="section relative" id="service">
            <SectionBubbles />
            <div className="relative">
              <SectionHeader
                eyebrow="Our Services"
                title="Support tailored to your relationship"
                copy="Three focused tracks that meet you where you are—private, relationship, and marriage counseling."
                align="center"
              />
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {services.map((service) => (
                  <Reveal key={service.slug}>
                    <div className="group overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-md transition hover:border-purple-300 hover:shadow-xl">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={serviceImages[service.slug as keyof typeof serviceImages] || "/images/img13.jpeg"}
                          alt={service.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      <div className="bg-white p-6">
                        <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                        <p className="mt-3 text-sm text-slate-700">{service.summary}</p>
                        <Link
                          href={`/services/${service.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-purple transition hover:text-brand-purple-light"
                        >
                          Learn more →
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/services" className="button button-ghost border-purple-200 text-brand-purple hover:bg-purple-50">
                  Explore All Services
                </Link>
              </div>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="section relative" id="aboutUs">
            <SectionBubbles />
            <div className="relative grid gap-8 md:grid-cols-2">
              <Reveal>
                <div className="relative h-full min-h-[400px] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/slid24.JPEG"
                    alt="Love Sense Counseling"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-brand-purple/20 to-brand-purple-light/15" />
                </div>
              </Reveal>
              <Reveal>
                <div className="flex h-full flex-col justify-center">
                  <p className="pill w-fit text-xs font-semibold uppercase tracking-[0.2em]">Who We Are</p>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    International virtual counseling platform
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    Love Sense is an international virtual counseling platform offering emotional, mental, and relationship
                    support to individuals and couples across the world.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    We help you overcome heartbreak, anxiety, relationship issues, communication problems, and overwhelming
                    emotions through compassionate talk therapy.
                  </p>
                  <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50/50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Serving clients in:</p>
                    <p className="mt-2 text-sm text-slate-700">
                      Ghana, USA, Nigeria, UK, UAE, Kenya, Rwanda, Botswana, France, Canada, China, Russia, and more.
                    </p>
                  </div>
                  <p className="mt-6 text-sm font-semibold text-red-600">
                    PLEASE NOTE: We are NOT a Medical or Psychiatric clinic and do NOT provide Clinical Services.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Our Therapy Style Section */}
          <section className="section relative">
            <SectionBubbles />
            <div className="relative">
              <SectionHeader
                eyebrow="Our Therapy Style"
                title="Evidence-based approaches tailored to you"
                copy="We don't force a method — we adapt counseling to your unique needs."
                align="center"
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {therapyApproaches.map((approach, idx) => (
                  <Reveal key={approach.title}>
                    <div className="border border-brand-purple rounded-xl h-full p-6 bg-brand-purple">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                        {idx + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{approach.title}</h3>
                      <p className="mt-2 text-sm text-white/90">{approach.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Love Sense Section */}
          <section className="section relative">
            <SectionBubbles />
            <div className="relative">
              <SectionHeader
                eyebrow="Why Choose Love Sense"
                title="What makes us different"
                copy="Four pillars that guide everything we do."
                align="center"
              />
              <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
                {whyChooseUs.map((item) => (
                  <Reveal key={item.number}>
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-purple-200 bg-linear-to-br from-purple-50 to-indigo-50 p-8 transition hover:border-purple-300 hover:shadow-lg">
                      <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 text-8xl font-bold text-purple-100 transition group-hover:text-purple-200">
                        {item.number}
                      </div>
                      <div className="relative flex flex-1 flex-col">
                        <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-3 flex-1 text-base text-slate-700">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>



          {/* Books Section */}
          <section className="section relative">
            <SectionBubbles />
            <div className="relative">
              <SectionHeader
                eyebrow="Latest Releases"
                title="Books from Love Sense"
                copy="Guides designed to meet you where you are—at home, between sessions."
                align="center"
              />
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {books.map((book) => (
                  <Reveal key={book.title}>
                    <div className="group overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-md transition hover:border-purple-300 hover:shadow-xl">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="bg-white p-6">
                        <h3 className="text-xl font-semibold text-slate-900">{book.title}</h3>
                        <p className="mt-3 text-sm text-slate-700">{book.description}</p>
                        <Link
                          href={book.buyLink}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-purple to-brand-purple-light px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="section relative" id="testimonial">
            <SectionBubbles />
            <div className="relative">
              <SectionHeader
                eyebrow="Our Testimonials"
                title="What They Say About Us"
                copy="Real stories from clients across the world who found healing and clarity through Love Sense."
                align="center"
              />
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <Reveal key={testimonial.name}>
                    <div className="card h-full bg-white p-6">
                      <div className="mb-4 text-4xl text-purple-200">&quot;</div>
                      <p className="text-sm leading-relaxed text-slate-700">{testimonial.quote}</p>
                      <p className="mt-6 text-sm font-semibold text-slate-900">— {testimonial.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Get Started Today Section */}
          <section className="section relative" id="bookUs">
            <SectionBubbles />
            <div className="relative">
              <div className="section-narrow relative overflow-hidden rounded-3xl border border-purple-200 bg-linear-to-br from-purple-50 via-indigo-50 to-transparent p-10 md:p-16">
                <div className="absolute right-0 top-0 -translate-y-20 translate-x-20 text-9xl font-bold text-purple-100">
                  START
                </div>
                <Reveal>
                  <div className="relative flex flex-col items-center gap-6 text-center">
                    <p className="pill w-fit text-xs font-semibold uppercase tracking-[0.2em]">Get Started Today</p>
                    <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl md:text-5xl">
                      Healing is one conversation away.
                    </h2>
                    <p className="max-w-2xl text-base text-slate-700">
                      Share your preferred date and time on the booking page and we&apos;ll confirm within one business day.
                      Payments are processed securely; your bank will handle currency conversion automatically.
                    </p>
                    <Link
                      href="/booking"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-purple to-brand-purple-light px-8 py-4 text-base font-semibold !text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-px hover:shadow-indigo-500/50"
                    >
                      Book a Session
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
