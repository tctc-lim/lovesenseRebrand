import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mental Health Insights & Emotional Wellness Tips | Blog | Love Sense",
    description:
        "Read expert articles on emotional wellness, mental health awareness, self-growth, trauma recovery, relationships, stress management, and practical mental health tips.",
    keywords:
        "mental health blog, emotional wellness articles, therapy tips, mental health awareness, healing journey resources, self-help blog, counseling insights, relationship advice, trauma recovery tips",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

