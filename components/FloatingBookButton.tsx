"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingBookButton() {
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        // Initial ring after 2 seconds
        const initialTimeout = setTimeout(() => {
            setIsRinging(true);
            setTimeout(() => setIsRinging(false), 800);
        }, 2000);

        // Ring every 5 seconds
        const interval = setInterval(() => {
            setIsRinging(true);
            setTimeout(() => setIsRinging(false), 800);
        }, 5000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
            <div className="relative h-24 w-24 md:h-28 md:w-28">
                {/* Curved Text Around Top */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <path
                            id="textCircle"
                            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0"
                            fill="none"
                        />
                    </defs>
                    <text
                        className="fill-brand-purple"
                        fontSize="11"
                        fontWeight="800"
                        style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"
                        }}
                    >
                        <textPath
                            href="#textCircle"
                            startOffset="50%"
                            textAnchor="middle"
                        >
                            Book a Session
                        </textPath>
                    </text>
                </svg>

                {/* Main Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link
                        href="/booking"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-brand-purple to-brand-purple-light shadow-lg shadow-brand-purple/40 transition-all hover:scale-110 hover:shadow-xl hover:shadow-brand-purple/50 md:h-16 md:w-16"
                        aria-label="Book a session"
                        style={
                            isRinging
                                ? {
                                    animation: "ring 0.8s ease-in-out",
                                    transformOrigin: "center center",
                                }
                                : {}
                        }
                    >
                        <svg
                            className="h-6 w-6 text-white md:h-7 md:w-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

