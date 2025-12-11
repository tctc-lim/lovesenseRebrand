import type { Metadata } from "next";
import { getBlogsCollection } from "@/lib/mongodb";
import { convertDbBlogToFrontend } from "@/lib/blog-utils";
import { ObjectId, WithId, Document } from "mongodb";

interface BlogDocument extends Document {
    title: string;
    readTime: string;
    image1: string | null;
    image2: string | null;
    content1: string;
    content2: string | null;
    tag1: string | null;
    tag2: string | null;
    tag3: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const blogsCollection = await getBlogsCollection();
        const blogId = slug.split("-")[0]; // Extract ID from slug format: "id-title-slug"

        const blog = (await blogsCollection.findOne({
            _id: new ObjectId(blogId),
            status: "PUBLISHED",
        })) as WithId<BlogDocument> | null;

        if (!blog) {
            return {
                title: "Blog Post Not Found | Love Sense",
                description: "The blog post you're looking for could not be found.",
            };
        }

        const frontendBlog = convertDbBlogToFrontend(blog);
        const excerpt = frontendBlog.excerpt.replace(/\.\.\.$/, ""); // Remove trailing ...
        const imageUrl = frontendBlog.image1
            ? frontendBlog.image1.startsWith("http")
                ? frontendBlog.image1
                : `https://mylovesense.online${frontendBlog.image1}`
            : "https://mylovesense.online/images/logos/logo2.png";

        const url = `https://mylovesense.online/blog/${slug}`;
        const keywords = frontendBlog.tags?.join(", ") || "mental health, counseling, therapy";

        return {
            title: `${frontendBlog.title} | Love Sense Blog`,
            description: excerpt || `Read about ${frontendBlog.title} on Love Sense blog. Expert insights on mental health, counseling, and emotional wellness.`,
            keywords: keywords,
            authors: [{ name: frontendBlog.author }],
            openGraph: {
                title: frontendBlog.title,
                description: excerpt || `Read about ${frontendBlog.title} on Love Sense blog.`,
                url: url,
                siteName: "Love Sense",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: frontendBlog.title,
                    },
                ],
                locale: "en_US",
                type: "article",
                publishedTime: blog.createdAt.toISOString(),
                modifiedTime: blog.updatedAt.toISOString(),
                authors: [frontendBlog.author],
                tags: frontendBlog.tags || [],
            },
            twitter: {
                card: "summary_large_image",
                title: frontendBlog.title,
                description: excerpt || `Read about ${frontendBlog.title} on Love Sense blog.`,
                images: [imageUrl],
            },
            alternates: {
                canonical: url,
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Blog Post | Love Sense",
            description: "Read expert articles on mental health and emotional wellness.",
        };
    }
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

