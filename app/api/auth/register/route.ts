import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "admin@lovesense2488";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, role = "admin" } = body;

        // Check if any admins exist
        const usersCollection = await getUsersCollection();
        const adminCount = await usersCollection.countDocuments({ role: "admin" });

        // If admins exist, require authentication
        // If no admins exist, allow first admin creation without auth
        if (adminCount > 0) {
            requireAdmin(request);
        }

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email: email.trim().toLowerCase() });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await usersCollection.insertOne({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role,
            status: "ACTIVE", // New admins are active by default
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const user = {
            _id: result.insertedId,
            name,
            email: email.trim().toLowerCase(),
            role,
        };

        // If this is the first admin, return token for auto-login
        // Otherwise, just return success (existing admin creating new admin)
        if (adminCount === 0) {
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
                message: "First admin created successfully",
                token,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: "Admin created successfully",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, error: "Registration failed. Please try again." },
            { status: 500 }
        );
    }
}
