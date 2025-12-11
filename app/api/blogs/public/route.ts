import { NextRequest, NextResponse } from "next/server";
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

// Public endpoint to fetch published blogs for frontend
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const limit = parseInt(searchParams.get("limit") || "10");

        const blogsCollection = await getBlogsCollection();

        if (slug) {
            // Extract ID from slug (format: "id-slug")
            const id = slug.split("-")[0];
            const blog = (await blogsCollection.findOne({
                _id: new ObjectId(id),
                status: "PUBLISHED",
            })) as WithId<BlogDocument> | null;

            if (!blog) {
                return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, blog: convertDbBlogToFrontend(blog) });
        } else {
            // Fetch all published blogs
            const blogs = (await blogsCollection
                .find({ status: "PUBLISHED" })
                .sort({ createdAt: -1 })
                .limit(limit)
                .toArray()) as WithId<BlogDocument>[];

            const convertedBlogs = blogs.map((blog) => convertDbBlogToFrontend(blog));
            return NextResponse.json({ success: true, blogs: convertedBlogs });
        }
    } catch (error) {
        console.error("Error fetching public blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}
