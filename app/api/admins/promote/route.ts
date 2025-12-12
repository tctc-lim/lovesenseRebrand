import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { requireSuperAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";

// POST - Promote an admin to superAdmin (only if no superAdmin exists)
// This is a one-time migration endpoint
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { adminId } = body;

        if (!adminId) {
            return NextResponse.json(
                { success: false, error: "Admin ID is required" },
                { status: 400 }
            );
        }

        const usersCollection = await getUsersCollection();

        // Check if any superAdmin already exists
        const superAdminCount = await usersCollection.countDocuments({ role: "superAdmin" });

        // If superAdmin exists, require superAdmin authentication
        // If no superAdmin exists, allow promotion (one-time migration)
        if (superAdminCount > 0) {
            requireSuperAdmin(request);
        }

        // Find the admin to promote
        const admin = await usersCollection.findOne({
            _id: new ObjectId(adminId),
            role: "admin"
        });

        if (!admin) {
            return NextResponse.json(
                { success: false, error: "Admin not found or already a superAdmin" },
                { status: 404 }
            );
        }

        // Promote to superAdmin
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(adminId) },
            { $set: { role: "superAdmin", updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, error: "Failed to promote admin" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Admin promoted to superAdmin successfully",
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error promoting admin:", error);
        return NextResponse.json(
            { success: false, error: "Failed to promote admin" },
            { status: 500 }
        );
    }
}

