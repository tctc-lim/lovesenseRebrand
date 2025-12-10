import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Book a Session or Speak With a Counselor | Love Sense",
    description:
        "Get in touch to book a counseling session, ask questions, or connect with our support team. We are here to guide you on your mental wellness journey with compassion and confidentiality.",
    keywords:
        "Contact the counseling center, book a therapy session, mental health support contact, counseling inquiries, therapy appointment, or talk to a counselor",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

