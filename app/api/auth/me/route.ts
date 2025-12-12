import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getUsersCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
    try {
        const authUser = getAuthUser(request);
        if (!authUser) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch fresh user data from database to get current role
        const usersCollection = await getUsersCollection();
        // JWT stores id as string (from _id.toString()), but interface says number
        // Try both string and number formats
        let user = null;
        try {
            const userId = typeof authUser.id === "string" ? authUser.id : authUser.id.toString();
            user = await usersCollection.findOne({ 
                _id: new ObjectId(userId),
                $or: [{ role: "admin" }, { role: "superAdmin" }]
            });
        } catch {
            // If ObjectId conversion fails, try finding by email as fallback
            user = await usersCollection.findOne({ 
                email: authUser.email,
                $or: [{ role: "admin" }, { role: "superAdmin" }]
            });
        }

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // Return user with current role from database
        return NextResponse.json({
            success: true,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role, // Current role from database
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { success: false, error: "Failed to get user" },
            { status: 500 }
        );
    }
}

