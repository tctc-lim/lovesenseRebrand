import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Counseling & Mental Wellness Services | Individual, Family & Couples Therapy",
    description:
        "Explore our full range of professional counseling services, including individual therapy, couples counseling, family therapy, trauma-informed care, grief support, youth counseling, and wellness coaching.",
    keywords:
        "counseling services, therapy services, trauma therapy, grief counseling, couples counseling, family therapy, mental wellness programs, emotional support services, online therapy, holistic mental health",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

