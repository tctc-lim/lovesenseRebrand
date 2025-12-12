import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { requireSuperAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";

// PUT - Suspend/Activate an admin
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        requireSuperAdmin(request);
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !["ACTIVE", "SUSPENDED"].includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid status. Must be ACTIVE or SUSPENDED" },
                { status: 400 }
            );
        }

        const usersCollection = await getUsersCollection();

        // Check if admin exists and get their email
        const admin = await usersCollection.findOne({
            _id: new ObjectId(id),
            $or: [{ role: "admin" }, { role: "superAdmin" }]
        });

        if (!admin) {
            return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
        }

        // Prevent suspending the protected email
        if (status === "SUSPENDED" && admin.email === "chukkydave@gmail.com") {
            return NextResponse.json(
                { success: false, error: "This admin cannot be suspended" },
                { status: 403 }
            );
        }

        const result = await usersCollection.updateOne(
            {
                _id: new ObjectId(id),
                $or: [{ role: "admin" }, { role: "superAdmin" }]
            },
            { $set: { status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `Admin ${status === "SUSPENDED" ? "suspended" : "activated"} successfully`,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error updating admin status:", error);
        return NextResponse.json({ success: false, error: "Failed to update admin status" }, { status: 500 });
    }
}


