"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/booking", label: "Booking" },
];

export function NavBar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const isHomePage = pathname === "/";
    const [scrolledPastHero, setScrolledPastHero] = useState(!isHomePage || (typeof window !== "undefined" && window.scrollY > window.innerHeight - 100));

    useEffect(() => {
        if (!isHomePage) {
            return;
        }

        const handleScroll = () => {
            // Hero section is full viewport height (h-screen), so check if scrolled past it
            const heroHeight = window.innerHeight;
            setScrolledPastHero(window.scrollY > heroHeight - 100); // 100px threshold for smoother transition
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage]);

    const isActive = (href: string) =>
        href === "/"
            ? pathname === href
            : pathname.startsWith(href) || pathname === href;

    return (
        <header className={`sticky top-0 z-50 mx-auto w-full ${isHomePage ? "" : "max-w-6xl"} px-4 pt-6 sm:px-6 lg:px-8`}>
            <nav className={`${isHomePage ? "bg-transparent backdrop-blur-sm" : "glass"} relative flex items-center justify-between ${isHomePage ? "rounded-2xl" : "rounded-2xl"} px-5 py-3`}>
                <Link href="/" className="flex items-center">
                    <Image
                        src={isHomePage && !scrolledPastHero ? "/images/logos/logo3.png" : "/images/logos/logo2.png"}
                        alt="Love Sense Logo"
                        width={150}
                        height={50}
                        className="h-auto w-auto"
                        priority
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className={`inline-flex items-center gap-2 rounded-full border ${isHomePage ? "border-white/30" : "border-white/10"} px-3 py-2 text-sm ${isHomePage ? "text-white" : "text-slate-200"} transition hover:bg-white/10 md:hidden`}
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-[6px]">
                        <span className="block h-0.5 w-5 bg-white" />
                        <span className="block h-0.5 w-5 bg-white" />
                        <span className="block h-0.5 w-5 bg-white" />
                    </div>
                    Menu
                </button>

                <div className="hidden items-center gap-2 md:flex">
                    <ul className="flex items-center gap-1 text-sm font-medium">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`rounded-full px-3 py-2 transition ${isActive(link.href)
                                        ? isHomePage && !scrolledPastHero ? "!bg-white/20 !text-white" : "!bg-white/10 !text-brand-purple"
                                        : isHomePage && !scrolledPastHero ? "!text-white/90 !hover:bg-white/10 !hover:text-white" : "!text-brand-purple !hover:bg-purple-50 !hover:text-brand-purple"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/booking"
                        className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-md shadow-indigo-500/25 transition hover:-translate-y-px md:inline-flex"
                    >
                        Book a call
                    </Link>
                </div>
            </nav>

            {open ? (
                <div className={`${isHomePage ? "bg-white/10 backdrop-blur-md border-white/20" : "glass"} mt-3 flex flex-col gap-2 rounded-2xl p-4 text-sm text-brand-purple md:hidden`}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`rounded-xl px-3 py-2 transition ${isActive(link.href)
                                ? "bg-purple-50 text-brand-purple"
                                : "hover:bg-purple-50 hover:text-brand-purple"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/booking"
                        onClick={() => setOpen(false)}
                        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand-purple to-brand-purple-light px-4 py-2 font-semibold !text-white shadow-lg shadow-indigo-500/30"
                    >
                        Book a call
                    </Link>
                </div>
            ) : null}
        </header>
    );
}

