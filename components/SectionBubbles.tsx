"use client";

export function SectionBubbles() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-x-hidden overflow-y-hidden">
            {/* Large bubbles for this section */}
            <div className="absolute left-[-5%] top-[10%] h-48 w-48 animate-float rounded-full bg-brand-lemon-12 blur-xl" />
            <div className="absolute right-[-5%] top-[30%] h-56 w-56 animate-float-delayed rounded-full bg-brand-purple-10 blur-xl" />
            <div className="absolute left-[50%] top-[60%] h-44 w-44 animate-float-slow rounded-full bg-brand-purple-light-12 blur-xl" />
            <div className="absolute right-[10%] top-[70%] h-40 w-40 animate-float rounded-full bg-brand-lemon-10 blur-xl" />

            {/* Medium bubbles */}
            <div className="absolute left-[20%] top-[20%] h-32 w-32 animate-float-delayed rounded-full bg-brand-purple-15 blur-lg" />
            <div className="absolute right-[25%] top-[50%] h-28 w-28 animate-float-slow rounded-full bg-brand-purple-light-15 blur-lg" />
            <div className="absolute left-[60%] top-[80%] h-36 w-36 animate-float rounded-full bg-brand-lemon-12 blur-lg" />
        </div>
    );
}

