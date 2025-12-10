"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type RevealProps = {
    children: React.ReactNode;
    delay?: number;
    y?: number;
};

export function Reveal({ children, delay = 0, y = 32 }: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            element.style.opacity = "1";
            element.style.transform = "none";
            return;
        }

        gsap.set(element, { opacity: 0, y });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            delay,
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay, y]);

    return <div ref={ref}>{children}</div>;
}

