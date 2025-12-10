"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";

// Mock blog posts data - replace with actual data from CMS or API
const featuredPost = {
    id: 1,
    title: "Understanding Emotional Wellness: A Guide to Better Mental Health",
    excerpt:
        "Discover practical strategies for managing stress, building resilience, and nurturing your emotional well-being in everyday life.",
    author: "Dr. Sarah Mensah",
    date: "January 15, 2025",
    category: "Mental Health",
    image: "/images/slid24.JPEG",
    readTime: "5 min read",
    slug: "understanding-emotional-wellness",
};

const blogPosts = [
    {
        id: 2,
        title: "5 Signs Your Relationship Needs Professional Support",
        excerpt:
            "Recognizing when to seek couples counseling can be the first step toward healing and strengthening your partnership.",
        author: "Michael Osei",
        date: "January 12, 2025",
        category: "Relationships",
        image: "/images/img4.jpeg",
        readTime: "4 min read",
        slug: "signs-relationship-needs-support",
    },
    {
        id: 3,
        title: "Healing from Heartbreak: A Journey to Wholeness",
        excerpt:
            "Navigating the pain of loss and finding hope again. Learn how to process grief and rebuild your emotional foundation.",
        author: "Ama Asante",
        date: "January 10, 2025",
        category: "Healing",
        image: "/images/img13.jpeg",
        readTime: "6 min read",
        slug: "healing-from-heartbreak",
    },
    {
        id: 4,
        title: "Building Healthy Communication in Your Relationship",
        excerpt:
            "Effective communication is the foundation of strong relationships. Discover techniques that foster understanding and connection.",
        author: "Dr. Sarah Mensah",
        date: "January 8, 2025",
        category: "Relationships",
        image: "/images/img5.jpeg",
        readTime: "5 min read",
        slug: "healthy-communication-relationships",
    },
    {
        id: 5,
        title: "Managing Anxiety: Practical Tools for Daily Life",
        excerpt:
            "Anxiety doesn't have to control your life. Explore evidence-based techniques to manage anxious thoughts and feelings.",
        author: "Michael Osei",
        date: "January 5, 2025",
        category: "Mental Health",
        image: "/images/mockup/1.jpg",
        readTime: "7 min read",
        slug: "managing-anxiety-practical-tools",
    },
    {
        id: 6,
        title: "The Importance of Self-Care in Mental Wellness",
        excerpt:
            "Self-care isn't selfish—it's essential. Learn how to prioritize your well-being and create sustainable self-care practices.",
        author: "Ama Asante",
        date: "January 3, 2025",
        category: "Wellness",
        image: "/images/mockup/2.jpg",
        readTime: "4 min read",
        slug: "importance-self-care-mental-wellness",
    },
    {
        id: 7,
        title: "Navigating Family Dynamics: Finding Balance and Harmony",
        excerpt:
            "Family relationships can be complex. Discover strategies for improving communication and resolving conflicts with loved ones.",
        author: "Dr. Sarah Mensah",
        date: "December 30, 2024",
        category: "Family",
        image: "/images/mockup/3.jpg",
        readTime: "6 min read",
        slug: "navigating-family-dynamics",
    },
    {
        id: 8,
        title: "Overcoming Trauma: Steps Toward Recovery",
        excerpt:
            "Healing from trauma is possible. Learn about trauma-informed approaches and the path to recovery and resilience.",
        author: "Michael Osei",
        date: "December 28, 2024",
        category: "Healing",
        image: "/images/mockup/5.jpg",
        readTime: "8 min read",
        slug: "overcoming-trauma-recovery",
    },
    {
        id: 9,
        title: "Teen Mental Health: Supporting Young People Through Challenges",
        excerpt:
            "Understanding the unique mental health needs of teenagers and how to provide effective support during difficult times.",
        author: "Ama Asante",
        date: "December 25, 2024",
        category: "Youth",
        image: "/images/mockup/6.jpg",
        readTime: "5 min read",
        slug: "teen-mental-health-support",
    },
];

const categories = ["All", "Mental Health", "Relationships", "Healing", "Wellness", "Family", "Youth"];

export default function BlogPage() {
    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slid24.JPEG"
                        alt="Love Sense Blog"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Our Blog</h1>
                    <p className="text-xl text-white/90 sm:text-2xl">
                        Insights, guidance, and support for your journey toward emotional wellness
                    </p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                {/* Featured Post */}
                <section className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all hover:shadow-purple-500/30">
                                <div className="relative h-[500px] md:h-[600px]">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <div className="mb-4 flex items-center gap-4 flex-wrap">
                                            <span className="rounded-full bg-brand-purple px-4 py-1.5 text-sm font-semibold text-white">
                                                {featuredPost.category}
                                            </span>
                                            <span className="text-sm text-white/80">{featuredPost.readTime}</span>
                                            <span className="text-sm text-white/80">{featuredPost.date}</span>
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="mb-6 text-lg leading-relaxed text-white/95 sm:text-xl">{featuredPost.excerpt}</p>
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{featuredPost.author}</p>
                                                <p className="text-xs text-white/70">Counselor</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-purple shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            Read Article
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="rounded-full border-2 border-purple-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-purple hover:bg-purple-50"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogPosts.map((post, index) => (
                                <Reveal key={post.id} delay={index * 0.1}>
                                    <Link href={`/blog/${post.slug}`} className="group block">
                                        <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-xl transition-all hover:border-brand-purple hover:shadow-2xl">
                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="rounded-full bg-brand-purple px-3 py-1 text-xs font-semibold text-white">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
                                                    <span>{post.date}</span>
                                                    <span>•</span>
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition group-hover:text-brand-purple">
                                                    {post.title}
                                                </h3>
                                                <p className="mb-4 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-purple-100" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-900">{post.author}</p>
                                                        <p className="text-xs text-slate-500">Counselor</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="section relative">
                    <SectionBubbles />
                    <div className="relative">
                        <div className="rounded-3xl border-2 border-purple-200 bg-brand-purple p-12 md:p-16">
                            <Reveal>
                                <div className="flex flex-col items-center gap-6 text-center">
                                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                                        Stay Updated with Our Latest Articles
                                    </h2>
                                    <p className="max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">
                                        Get insights, tips, and support delivered to your inbox. Join our community of readers committed to
                                        emotional wellness.
                                    </p>
                                    <form className="mt-4 flex w-full max-w-md flex-col gap-4 sm:flex-row">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-6 py-3 text-base text-white placeholder-white/70 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-purple shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
