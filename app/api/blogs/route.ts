import { NextRequest, NextResponse } from "next/server";
import { getBlogsCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";

// GET - Fetch all blogs or a single blog by ID
export async function GET(request: NextRequest) {
    try {
        // Require admin authentication for admin blog list
        requireAdmin(request);

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const blogsCollection = await getBlogsCollection();

        if (id) {
            // Fetch single blog
            const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
            if (!blog) {
                return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, blog });
        } else {
            // Fetch all blogs with pagination
            const offset = (page - 1) * limit;
            const [blogs, total] = await Promise.all([
                blogsCollection
                    .find({})
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit)
                    .toArray(),
                blogsCollection.countDocuments({}),
            ]);

            return NextResponse.json({
                success: true,
                blogs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST - Create a new blog
export async function POST(request: NextRequest) {
    try {
        requireAdmin(request);
        const body = await request.json();

        const { title, readTime, content1, content2, image1, image2, tag1, tag2, tag3, status = "PENDING" } = body;

        if (!title || !readTime || !content1) {
            return NextResponse.json({ success: false, error: "Title, read time, and content1 are required" }, { status: 400 });
        }

        const blogsCollection = await getBlogsCollection();
        const result = await blogsCollection.insertOne({
            title,
            readTime,
            image1: image1 || null,
            image2: image2 || null,
            content1,
            content2: content2 || null,
            tag1: tag1 || null,
            tag2: tag2 || null,
            tag3: tag3 || null,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId.toString(), message: "Blog created successfully" });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error creating blog:", error);
        return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
    }
}
