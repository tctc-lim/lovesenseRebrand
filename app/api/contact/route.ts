import { NextRequest, NextResponse } from "next/server";
import { sendMail, generateContactEmailHtml } from "@/lib/mail";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Send email using Brevo
        const recipientEmail = process.env.CONTACT_EMAIL || "info.mylovesense@gmail.com";
        const emailSubject = subject || `New Contact Form Submission from ${name}`;
        const html = generateContactEmailHtml({
            name,
            email,
            phone,
            subject,
            message,
        });

        await sendMail({
            to: recipientEmail,
            subject: emailSubject,
            html,
            replyTo: email,
        });

        return NextResponse.json({
            success: true,
            message: "Your message has been sent successfully. We'll get back to you soon!",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while sending your message" },
            { status: 500 }
        );
    }
}

