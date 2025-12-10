import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Our Mission, Vision & Mental Wellness Approach | Love Sense",
    description:
        "Learn about our mission, values, and dedicated team of professional counselors committed to providing a safe, confidential space for healing, growth, and emotional transformation.",
    keywords:
        "about our counseling center, counseling professionals, mental health mission, therapy team, emotional wellness journey, counseling philosophy, mental health organization",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

