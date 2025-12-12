import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

// GET - Fetch all admins
export async function GET(request: NextRequest) {
    try {
        const usersCollection = await getUsersCollection();
        const adminCount = await usersCollection.countDocuments({
            $or: [{ role: "admin" }, { role: "superAdmin" }]
        });

        // If admins exist, require authentication
        // If no admins exist, allow access for first admin creation
        if (adminCount > 0) {
            requireAdmin(request);
        }

        const admins = await usersCollection
            .find({ $or: [{ role: "admin" }, { role: "superAdmin" }] })
            .sort({ createdAt: -1 })
            .toArray();

        // Remove password from response
        const adminsWithoutPassword = admins.map((admin) => ({
            _id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
            status: admin.status || "ACTIVE",
            createdAt: admin.createdAt,
        }));

        return NextResponse.json({ success: true, admins: adminsWithoutPassword });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (errorMessage === "Unauthorized" || errorMessage.includes("Forbidden")) {
            return NextResponse.json({ success: false, error: errorMessage }, { status: 403 });
        }
        console.error("Error fetching admins:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch admins" }, { status: 500 });
    }
}

