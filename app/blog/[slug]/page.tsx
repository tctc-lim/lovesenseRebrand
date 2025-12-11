"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionBubbles } from "@/components/SectionBubbles";
import { use } from "react";
import Script from "next/script";

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    date: string;
    category: string;
    image: string;
    image1?: string | null;
    image2?: string | null;
    tags?: string[];
    readTime: string;
    slug: string;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
    const { slug } = use(params);
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blogs/public?slug=${slug}`);
                const data = await response.json();
                if (data.success && data.blog) {
                    setPost(data.blog);
                    // Fetch related posts
                    const allResponse = await fetch("/api/blogs/public?limit=20");
                    const allData = await allResponse.json();
                    if (allData.success && allData.blogs) {
                        const currentPost = data.blog;
                        const related = allData.blogs
                            .filter((p: BlogPost) => {
                                if (p.id === currentPost.id) return false;
                                // Match by category or any shared tag
                                if (p.category === currentPost.category) return true;
                                if (currentPost.tags && p.tags) {
                                    return currentPost.tags.some((tag: string) => p.tags?.includes(tag));
                                }
                                return false;
                            })
                            .slice(0, 3);
                        setRelatedPosts(related);
                    }
                } else {
                    router.push("/blog");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                router.push("/blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg text-slate-600">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image1 || post.image || "https://mylovesense.online/images/logos/logo2.png",
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        author: {
            "@type": "Organization",
            name: post.author,
            url: "https://mylovesense.online",
        },
        publisher: {
            "@type": "Organization",
            name: "Love Sense",
            logo: {
                "@type": "ImageObject",
                url: "https://mylovesense.online/images/logos/logo2.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://mylovesense.online/blog/${post.slug}`,
        },
        keywords: post.tags?.join(", ") || "",
        articleSection: post.category,
    };

    return (
        <div className="relative isolate overflow-hidden overflow-x-hidden">
            {/* Structured Data for SEO */}
            <Script
                id="blog-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Hero Section with Featured Image */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/85 via-brand-purple-light/75 to-brand-purple/85" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div className="mb-4 flex items-center gap-4 flex-wrap justify-center">
                            {post.tags && post.tags.length > 0 ? (
                                post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white"
                                    >
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white">
                                    {post.category}
                                </span>
                            )}
                            <span className="text-sm text-white/90">{post.readTime}</span>
                            <span className="text-sm text-white/90">{post.date}</span>
                        </div>
                        <h1 className="mb-6 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm" />
                            <div className="text-center sm:text-left">
                                <p className="text-sm font-semibold text-white">{post.author}</p>
                                <p className="text-xs text-white/70">Counselor</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                {/* Article Content */}
                <article className="section relative -mt-20">
                    <SectionBubbles />
                    <div className="relative">
                        <Reveal>
                            <div className="rounded-3xl bg-white p-8 shadow-2xl md:p-12">
                                <div
                                    className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-img:rounded-2xl prose-img:w-full prose-img:h-auto prose-img:my-8"
                                    dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
                                />
                            </div>
                        </Reveal>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <section className="section relative">
                        <SectionBubbles />
                        <div className="relative">
                            <Reveal>
                                <h2 className="mb-8 text-3xl font-bold text-slate-900">Related Articles</h2>
                            </Reveal>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((relatedPost: BlogPost, index: number) => (
                                    <Reveal key={relatedPost.id} delay={index * 0.1}>
                                        <Link href={`/blog/${relatedPost.slug}`} className="group block">
                                            <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-xl transition-all hover:border-brand-purple hover:shadow-2xl">
                                                {/* Image */}
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image
                                                        src={relatedPost.image}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="rounded-full bg-brand-purple px-3 py-1 text-xs font-semibold text-white">
                                                            {relatedPost.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
                                                        <span>{relatedPost.date}</span>
                                                        <span>•</span>
                                                        <span>{relatedPost.readTime}</span>
                                                    </div>
                                                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition group-hover:text-brand-purple">
                                                        {relatedPost.title}
                                                    </h3>
                                                    <p className="mb-4 text-sm leading-relaxed text-slate-600">{relatedPost.excerpt}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Back to Blog Link */}
                <section className="section relative">
                    <div className="relative">
                        <Reveal>
                            <div className="text-center">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-brand-purple bg-white px-6 py-3 text-base font-semibold text-brand-purple transition hover:bg-brand-purple hover:text-white"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Back to Blog
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </div>
    );
}

