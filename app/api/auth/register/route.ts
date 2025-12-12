import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/mongodb";
import { requireSuperAdmin } from "@/lib/auth";
import { sendMail, generateAdminCredentialsEmailHtml } from "@/lib/mail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "admin@lovesense2488";

// Generate a secure random password
function generatePassword(length: number = 12): string {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*";
    const allChars = uppercase + lowercase + numbers + symbols;

    let password = "";
    // Ensure at least one character from each set
    password += uppercase[crypto.randomInt(0, uppercase.length)];
    password += lowercase[crypto.randomInt(0, lowercase.length)];
    password += numbers[crypto.randomInt(0, numbers.length)];
    password += symbols[crypto.randomInt(0, symbols.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += allChars[crypto.randomInt(0, allChars.length)];
    }

    // Shuffle the password
    return password.split("").sort(() => crypto.randomInt(-1, 2)).join("");
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Check if any admins exist
        const usersCollection = await getUsersCollection();
        const adminCount = await usersCollection.countDocuments({
            $or: [{ role: "admin" }, { role: "superAdmin" }]
        });

        // If admins exist, require super admin authentication
        // If no admins exist, allow first admin creation without auth (will be superAdmin)
        if (adminCount > 0) {
            requireSuperAdmin(request);
        }

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Generate password automatically (don't use provided password)
        // For first admin, use provided password if given, otherwise generate
        const finalPassword = adminCount === 0 && password ? password : generatePassword();

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email: email.trim().toLowerCase() });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(finalPassword, 10);

        // Determine role: first admin becomes superAdmin, others are admin
        const userRole = adminCount === 0 ? "superAdmin" : "admin";

        // Create user
        const result = await usersCollection.insertOne({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role: userRole,
            status: "ACTIVE", // New admins are active by default
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const user = {
            _id: result.insertedId,
            name,
            email: email.trim().toLowerCase(),
            role: userRole,
        };

        // Send email with credentials to new admin (except for first admin who sets their own password)
        if (adminCount > 0) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://mylovesense.online";
                const loginUrl = `${baseUrl}/admin/login`;
                const emailHtml = generateAdminCredentialsEmailHtml({
                    name: user.name,
                    email: user.email,
                    password: finalPassword, // Send the plain password via email
                    loginUrl: loginUrl,
                });

                console.log(`Attempting to send admin credentials email to: ${user.email}`);
                const emailResult = await sendMail({
                    to: user.email,
                    subject: "Your Love Sense Admin Account Credentials",
                    html: emailHtml,
                });
                console.log("Admin credentials email sent successfully:", emailResult);
            } catch (emailError) {
                console.error("Error sending admin credentials email:", emailError);
                // Return error so admin knows email failed
                return NextResponse.json(
                    {
                        success: false,
                        error: `Admin created but failed to send credentials email: ${emailError instanceof Error ? emailError.message : "Unknown error"}`
                    },
                    { status: 500 }
                );
            }
        }

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
            message: "Admin created successfully. Credentials have been sent to their email.",
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
