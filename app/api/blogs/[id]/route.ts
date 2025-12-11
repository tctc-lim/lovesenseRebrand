import { NextRequest, NextResponse } from "next/server";
import { getBlogsCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { deleteImageFiles } from "@/lib/image-utils";

// GET - Fetch single blog by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Require admin authentication for admin blog access
        requireAdmin(request);

        const { id } = await params;
        const blogsCollection = await getBlogsCollection();
        const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, blog });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error fetching blog:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
    }
}

// PUT - Update a blog
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        requireAdmin(request);
        const { id } = await params;
        const body = await request.json();

        const { title, readTime, content1, content2, image1, image2, tag1, tag2, tag3, status } = body;

        if (!title || !content1) {
            return NextResponse.json({ success: false, error: "Title and content1 are required" }, { status: 400 });
        }

        const blogsCollection = await getBlogsCollection();

        // Fetch existing blog to get old image paths
        const existingBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });
        if (!existingBlog) {
            return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
        }

        // Track old images that will be replaced
        const imagesToDelete: (string | null | undefined)[] = [];
        if (image1 !== undefined && image1 !== existingBlog.image1) {
            imagesToDelete.push(existingBlog.image1);
        }
        if (image2 !== undefined && image2 !== existingBlog.image2) {
            imagesToDelete.push(existingBlog.image2);
        }

        const updateData: {
            title: string;
            content1: string;
            updatedAt: Date;
            readTime?: string;
            content2?: string | null;
            image1?: string | null;
            image2?: string | null;
            tag1?: string | null;
            tag2?: string | null;
            tag3?: string | null;
            status?: string;
        } = {
            title,
            content1,
            updatedAt: new Date(),
        };

        if (readTime !== undefined) updateData.readTime = readTime;
        if (content2 !== undefined) updateData.content2 = content2;
        if (image1 !== undefined) updateData.image1 = image1;
        if (image2 !== undefined) updateData.image2 = image2;
        if (tag1 !== undefined) updateData.tag1 = tag1 || null;
        if (tag2 !== undefined) updateData.tag2 = tag2 || null;
        if (tag3 !== undefined) updateData.tag3 = tag3 || null;
        if (status !== undefined) updateData.status = status;

        await blogsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        // Delete old images that were replaced
        if (imagesToDelete.length > 0) {
            await deleteImageFiles(imagesToDelete);
        }

        return NextResponse.json({ success: true, message: "Blog updated successfully" });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error updating blog:", error);
        return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
    }
}

// DELETE - Delete a blog
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        requireAdmin(request);
        const { id } = await params;
        const blogsCollection = await getBlogsCollection();

        // Fetch blog first to get image paths
        const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
        }

        // Delete the blog from database
        await blogsCollection.deleteOne({ _id: new ObjectId(id) });

        // Delete associated image files
        await deleteImageFiles([blog.image1, blog.image2]);

        return NextResponse.json({ success: true, message: "Blog deleted successfully" });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
    }
}
