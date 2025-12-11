import { NextRequest, NextResponse } from "next/server";
import { sendMail, generateBookingEmailHtml } from "@/lib/mail";
import { getBookingsCollection } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            first_name,
            last_name,
            email,
            phone,
            countryCode,
            country,
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

        // Parse appointment date
        const appointmentDateTime = new Date(`${appointmentDate}T${time}`);

        // Save booking to database
        const bookingsCollection = await getBookingsCollection();
        const result = await bookingsCollection.insertOne({
            firstName: first_name,
            lastName: last_name,
            email,
            phone,
            countryCode: countryCode || null,
            country: country || null,
            service,
            appointmentDate: appointmentDateTime,
            time,
            sessions,
            price: parseFloat(price),
            promoCode: promoCode || null,
            status: "PENDING",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Send email using Brevo
        const recipientEmail = process.env.BOOKING_EMAIL || "info.mylovesense@gmail.com";
        const subject = `New Booking Request from ${first_name} ${last_name}`;
        const html = generateBookingEmailHtml({
            firstName: first_name,
            lastName: last_name,
            email,
            phone,
            countryCode: countryCode || undefined,
            country: country || undefined,
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
            message: "Booking request received and saved",
            bookingId: result.insertedId.toString(),
        });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while processing your booking" },
            { status: 500 }
        );
    }
}
