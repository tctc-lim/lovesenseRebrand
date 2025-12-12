interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export async function sendMail({ to, subject, html, replyTo }: SendMailOptions) {
    if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY is not defined");
    }

    try {
        const emailData = {
            sender: {
                name: process.env.BREVO_FROM_NAME || "Love Sense",
                email: process.env.BREVO_FROM_EMAIL || "no-reply@mylovesense.online",
            },
            to: [{ email: to }],
            subject: subject,
            htmlContent: html,
            ...(replyTo && { replyTo: { email: replyTo } }),
        };

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
            throw new Error(`Brevo API error: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        console.log(`Email sent successfully to ${to}`, result);
        return { success: true, messageId: result.messageId };
    } catch (error: unknown) {
        console.error("Error sending email:", error instanceof Error ? error.message : "Unknown error");
        throw error;
    }
}

export function generateBookingEmailHtml(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode?: string;
    country?: string;
    service: string;
    date: string;
    time: string;
    sessions: string;
    price: string;
    promoCode?: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #662d91 0%, #9d6adf 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Booking Request</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Booking Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.phone}</td>
                </tr>
                ${data.countryCode ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Country Code:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.countryCode}</td>
                </tr>
                ` : ""}
                ${data.country ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Country:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.country}</td>
                </tr>
                ` : ""}
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Service:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.service}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.date}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Time:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.time}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Sessions:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.sessions}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Price:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.price}</td>
                </tr>
                ${data.promoCode ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Promo Code:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.promoCode}</td>
                </tr>
                ` : ""}
            </table>
            <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                    <strong>Note:</strong> Please confirm this booking and respond to the client at ${data.email}
                </p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>This is an automated message from Love Sense booking system.</p>
        </div>
    </div>
    `;
}

export function generateAdminCredentialsEmailHtml(data: {
    name: string;
    email: string;
    password: string;
    loginUrl: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #662d91 0%, #9d6adf 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Love Sense Admin Panel</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Your Admin Account Has Been Created</h2>
            <p style="color: #666; line-height: 1.6;">
                Hello ${data.name},
            </p>
            <p style="color: #666; line-height: 1.6;">
                Your admin account has been successfully created. You can now access the Love Sense admin panel using the credentials below:
            </p>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #662d91; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #333;">Email:</strong></td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #662d91; font-weight: 600;">${data.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong style="color: #333;">Password:</strong></td>
                        <td style="padding: 10px 0; color: #662d91; font-weight: 600; font-family: monospace; font-size: 16px;">${data.password}</td>
                    </tr>
                </table>
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${data.loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #662d91 0%, #9d6adf 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Login to Admin Panel
                </a>
            </div>
            <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                    <strong>Security Notice:</strong> Please change your password after your first login for security purposes. Do not share your credentials with anyone.
                </p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>This is an automated message from Love Sense admin system.</p>
            <p>If you did not expect this email, please contact support immediately.</p>
        </div>
    </div>
    `;
}

export function generateContactEmailHtml(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #662d91 0%, #9d6adf 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Contact Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.email}</td>
                </tr>
                ${data.phone ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.phone}</td>
                </tr>
                ` : ""}
                ${data.subject ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Subject:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.subject}</td>
                </tr>
                ` : ""}
            </table>
            <div style="margin-top: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border-left: 4px solid #662d91;">
                    <p style="margin: 0; color: #666; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                </div>
            </div>
            <div style="margin-top: 30px; padding: 15px; background-color: #d1ecf1; border-left: 4px solid #0c5460; border-radius: 4px;">
                <p style="margin: 0; color: #0c5460; font-size: 14px;">
                    <strong>Action Required:</strong> Please respond to this inquiry at ${data.email}
                </p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>This is an automated message from Love Sense contact form.</p>
        </div>
    </div>
    `;
}

