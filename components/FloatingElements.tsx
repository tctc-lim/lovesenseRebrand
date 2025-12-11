"use client";

export function FloatingElements() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-x-hidden overflow-y-hidden">
            {/* Big Floating Bubbles - Top Section */}
            <div className="absolute left-[5%] top-[15%] h-32 w-32 animate-float rounded-full bg-brand-lemon-15 blur-md" />
            <div className="absolute left-[85%] top-[25%] h-40 w-40 animate-float-delayed rounded-full bg-brand-purple-12 blur-md" />
            <div className="absolute left-[15%] top-[45%] h-36 w-36 animate-float-slow rounded-full bg-brand-purple-light-15 blur-md" />
            <div className="absolute left-[75%] top-[35%] h-28 w-28 animate-float rounded-full bg-brand-lemon-12 blur-md" />

            {/* Big Floating Bubbles - Middle Section */}
            <div className="absolute left-[10%] top-[55%] h-44 w-44 animate-float-delayed rounded-full bg-brand-purple-10 blur-md" />
            <div className="absolute left-[80%] top-[65%] h-32 w-32 animate-float-slow rounded-full bg-brand-purple-light-12 blur-md" />
            <div className="absolute left-[50%] top-[60%] h-36 w-36 animate-float rounded-full bg-brand-lemon-10 blur-md" />
            <div className="absolute left-[25%] top-[70%] h-40 w-40 animate-float-delayed rounded-full bg-brand-purple-12 blur-md" />

            {/* Big Floating Bubbles - Bottom Section */}
            <div className="absolute left-[5%] top-[85%] h-48 w-48 animate-float-slow rounded-full bg-brand-purple-light-10 blur-md" />
            <div className="absolute left-[90%] top-[80%] h-36 w-36 animate-float rounded-full bg-brand-lemon-12 blur-md" />
            <div className="absolute left-[60%] top-[90%] h-40 w-40 animate-float-delayed rounded-full bg-brand-purple-10 blur-md" />
            <div className="absolute left-[35%] top-[95%] h-32 w-32 animate-float-slow rounded-full bg-brand-purple-light-12 blur-md" />

            {/* Medium Bubbles scattered throughout */}
            <div className="absolute left-[20%] top-[30%] h-24 w-24 animate-float rounded-full bg-brand-lemon-18 blur-sm" />
            <div className="absolute left-[70%] top-[50%] h-20 w-20 animate-float-delayed rounded-full bg-brand-purple-15 blur-sm" />
            <div className="absolute left-[40%] top-[40%] h-28 w-28 animate-float-slow rounded-full bg-brand-purple-light-18 blur-sm" />
            <div className="absolute left-[55%] top-[75%] h-24 w-24 animate-float rounded-full bg-brand-lemon-15 blur-sm" />
            <div className="absolute left-[30%] top-[50%] h-20 w-20 animate-float-delayed rounded-full bg-brand-purple-18 blur-sm" />
            <div className="absolute left-[65%] top-[25%] h-28 w-28 animate-float-slow rounded-full bg-brand-purple-light-15 blur-sm" />

            {/* Floating Hearts */}
            <div className="absolute right-[15%] top-[25%] animate-float text-4xl opacity-20">💜</div>
            <div className="absolute right-[25%] top-[55%] animate-float-delayed text-3xl opacity-15">💚</div>
            <div className="absolute right-[35%] top-[70%] animate-float-slow text-5xl opacity-20">💛</div>
            <div className="absolute right-[10%] top-[45%] animate-float text-3xl opacity-15">💜</div>

            {/* Floating Butterflies */}
            <div className="absolute left-[15%] top-[35%] animate-butterfly text-3xl opacity-25">🦋</div>
            <div className="absolute left-[60%] top-[50%] animate-butterfly-delayed text-4xl opacity-20">🦋</div>
            <div className="absolute left-[40%] top-[65%] animate-butterfly-slow text-3xl opacity-25">🦋</div>
            <div className="absolute left-[80%] top-[40%] animate-butterfly text-3xl opacity-20">🦋</div>

            {/* Floating Shapes */}
            <div className="absolute right-[10%] top-[45%] h-8 w-8 rotate-45 animate-float rounded-lg bg-brand-lemon-20 blur-sm" />
            <div className="absolute right-[20%] top-[65%] h-6 w-6 rotate-12 animate-float-delayed rounded-full bg-brand-purple-15 blur-sm" />
            <div className="absolute right-[30%] top-[80%] h-10 w-10 -rotate-12 animate-float-slow rounded-lg bg-brand-purple-light-20 blur-sm" />

            {/* Pattern Dots */}
            <div className="absolute left-[5%] top-[10%] h-2 w-2 animate-pulse rounded-full bg-brand-purple-30" />
            <div className="absolute left-[90%] top-[15%] h-2 w-2 animate-pulse-delayed rounded-full bg-brand-purple-light-30" />
            <div className="absolute left-[8%] top-[90%] h-2 w-2 animate-pulse rounded-full bg-brand-lemon-30" />
            <div className="absolute left-[85%] top-[85%] h-2 w-2 animate-pulse-delayed rounded-full bg-brand-purple-30" />
        </div>
    );
}

