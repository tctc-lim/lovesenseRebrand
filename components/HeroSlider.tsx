"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "/images/slider/slid22.jpg",
        eyebrow: "WITH US",
        title: "You can find happiness again",
        cta: "Book Now",
        ctaHref: "#bookUs",
        buttonBg: "white",
        buttonText: "#bcd630",
    },
    {
        image: "/images/slider/slid21.jpg",
        eyebrow: "WITH Us",
        title: "You can\nhave a PERFECT Relationship",
        cta: "Talk to a Counselor",
        ctaHref: "#bookUs",
        buttonBg: "#662d91",
        buttonText: "white",
    },
];

const SLIDE_INTERVAL = 5000;

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        if (index === currentSlide) return;
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden" style={{ marginTop: '-84px', paddingTop: '96px' }}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
                        <div className="flex max-w-4xl flex-col items-center gap-6">
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">{slide.eyebrow}</span>
                            <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                                {slide.title.split("\n").map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < slide.title.split("\n").length - 1 && <br />}
                                    </span>
                                ))}
                            </h2>
                            <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                                A warm, safe, judgment free space where you can heal, grow, and rediscover emotional balance anytime, anywhere.
                            </p>
                            <Link
                                href={slide.ctaHref}
                                className="mt-2 inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold shadow-lg transition hover:shadow-xl"
                                style={{
                                    backgroundColor: slide.buttonBg,
                                    color: slide.buttonText,
                                    boxShadow: slide.buttonBg === "white"
                                        ? "0 10px 25px rgba(255, 255, 255, 0.2)"
                                        : "0 10px 25px rgba(102, 45, 145, 0.4)",
                                }}
                                onMouseEnter={(e) => {
                                    if (slide.buttonBg === "white") {
                                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                                    } else {
                                        e.currentTarget.style.backgroundColor = "#5a257c";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = slide.buttonBg;
                                }}
                            >
                                {slide.cta}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
                aria-label="Previous slide"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
                aria-label="Next slide"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

