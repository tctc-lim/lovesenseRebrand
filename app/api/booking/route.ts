import { NextRequest, NextResponse } from "next/server";
import { sendMail, generateBookingEmailHtml } from "@/lib/mail";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            first_name,
            last_name,
            email,
            phone,
            service,
            appointmentDate,
            time,
            sessions,
            price,
            promoCode,
        } = body;

        // Validate required fields
        const requiredFields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "service",
            "appointmentDate",
            "time",
            "sessions",
            "price",
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
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
        const recipientEmail = process.env.BOOKING_EMAIL || "info.mylovesense@gmail.com";
        const subject = `New Booking Request from ${first_name} ${last_name}`;
        const html = generateBookingEmailHtml({
            firstName: first_name,
            lastName: last_name,
            email,
            phone,
            service,
            date: appointmentDate,
            time,
            sessions,
            price,
            promoCode,
        });

        await sendMail({
            to: recipientEmail,
            subject,
            html,
            replyTo: email,
        });

        return NextResponse.json({
            success: true,
            message: "Booking request received and email sent",
        });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while processing your booking" },
            { status: 500 }
        );
    }
}

