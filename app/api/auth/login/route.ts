import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "admin@lovesense2488";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user in MongoDB
        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check if user is admin or superAdmin
        const role = user.role.toLowerCase();
        if (role !== "admin" && role !== "superadmin") {
            return NextResponse.json(
                { success: false, error: "Admin access required" },
                { status: 403 }
            );
        }

        // Check if admin is suspended
        if (user.status === "SUSPENDED") {
            return NextResponse.json(
                { success: false, error: "Your account has been suspended. Please contact an administrator." },
                { status: 403 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, error: "Login failed. Please try again." },
            { status: 500 }
        );
    }
}
