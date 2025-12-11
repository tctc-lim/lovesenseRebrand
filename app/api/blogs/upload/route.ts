import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        requireAdmin(request);

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ success: false, error: "Invalid file type. Only images are allowed." }, { status: 400 });
        }

        // Validate file size (max 1MB)
        const maxSize = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSize) {
            return NextResponse.json({ success: false, error: "File size exceeds 1MB limit" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}_${originalName}`;

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public", "uploads", "blogs");
        await mkdir(uploadDir, { recursive: true });

        // Save file
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/blogs/${filename}`;

        return NextResponse.json({ success: true, url: publicUrl, filename });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error uploading file:", error);
        return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 });
    }
}

