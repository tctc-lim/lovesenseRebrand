export type Service = {
    slug: string;
    name: string;
    category: string;
    summary: string;
    description: string;
    highlights: string[];
    deliverables: string[];
    keywords: string[];
    duration?: string;
    investment: string;
};

export const services: Service[] = [
    {
        slug: "private-counseling",
        name: "Private Counseling",
        category: "Individual Support",
        summary:
            "One-on-one virtual counseling to help you process anxiety, depression, grief, or life transitions in a safe space.",
        description:
            "Talk privately with licensed counselors who listen with empathy and guide you with practical tools. Sessions are flexible, discreet, and available wherever you are.",
        highlights: [
            "Confidential, judgment-free sessions",
            "Flexible scheduling across time zones",
            "Actionable exercises between sessions"
        ],
        deliverables: [
            "Personalized care plan",
            "Weekly or bi-weekly sessions",
            "Progress check-ins and resources",
            "Secure virtual meeting link"
        ],
        keywords: ["private counseling", "individual therapy", "anxiety support", "grief", "virtual session"],
        duration: "As needed",
        investment: "From $50/session"
    },
    {
        slug: "relationship-counseling",
        name: "Relationship Counseling",
        category: "Couples",
        summary:
            "Guidance for couples dating or committed who want to communicate better, heal friction, and feel connected again.",
        description:
            "We facilitate calm, productive conversations, give you tools to navigate conflict, and help you rebuild trust and intimacy with practical next steps.",
        highlights: [
            "Conflict de-escalation frameworks",
            "Healthy communication patterns",
            "Rebuilding trust and intimacy"
        ],
        deliverables: [
            "Joint and individual sessions",
            "Communication exercises",
            "Follow-up summaries with actions",
            "Resource library for at-home practice"
        ],
        keywords: ["relationship counseling", "couples therapy", "communication", "trust", "virtual counseling"],
        duration: "4–8 sessions",
        investment: "From $75/session"
    },
    {
        slug: "marriage-counseling",
        name: "Marriage Counseling",
        category: "Marriage",
        summary:
            "Support for pre-marriage and married couples to strengthen partnership, align expectations, and navigate conflict.",
        description:
            "Whether you’re preparing for marriage or navigating challenges, we provide structured guidance, empathy, and clear steps to protect your relationship.",
        highlights: [
            "Pre-marriage readiness and alignment",
            "Conflict resolution and boundaries",
            "Restoring closeness after setbacks"
        ],
        deliverables: [
            "Shared values and goals worksheet",
            "Tailored session plan",
            "Home practices and check-ins",
            "Referral support if specialized care is needed"
        ],
        keywords: ["marriage counseling", "premarital", "couples", "virtual therapy", "relationship help"],
        duration: "6–10 sessions",
        investment: "From $85/session"
    }
];

export function getServiceBySlug(slug: string) {
    return services.find((service) => service.slug === slug);
}

