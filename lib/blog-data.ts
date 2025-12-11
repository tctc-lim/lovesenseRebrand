// Blog posts data - replace with actual data from CMS or API
export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    slug: string;
}

export const featuredPost: BlogPost = {
    id: 1,
    title: "Understanding Emotional Wellness: A Guide to Better Mental Health",
    excerpt:
        "Discover practical strategies for managing stress, building resilience, and nurturing your emotional well-being in everyday life.",
    content: `
        <p>Emotional wellness is a crucial aspect of our overall health that often gets overlooked. In today's fast-paced world, taking care of our mental and emotional well-being is more important than ever.</p>
        
        <h2>What is Emotional Wellness?</h2>
        <p>Emotional wellness refers to the ability to successfully handle life's stresses and adapt to change and difficult times. It's about understanding and managing your feelings, building resilience, and maintaining a positive outlook on life.</p>
        
        <h2>Key Strategies for Emotional Wellness</h2>
        <h3>1. Practice Mindfulness</h3>
        <p>Mindfulness involves being present in the moment and aware of your thoughts and feelings without judgment. Regular mindfulness practice can help reduce stress and improve emotional regulation.</p>
        
        <h3>2. Build Strong Relationships</h3>
        <p>Connecting with others is essential for emotional wellness. Strong social connections provide support, reduce feelings of isolation, and contribute to a sense of belonging.</p>
        
        <h3>3. Develop Healthy Coping Mechanisms</h3>
        <p>Everyone faces challenges in life. Developing healthy ways to cope with stress, such as exercise, creative activities, or talking to a therapist, can significantly improve your emotional well-being.</p>
        
        <h3>4. Prioritize Self-Care</h3>
        <p>Self-care isn't selfish—it's necessary. Taking time for activities that bring you joy and relaxation helps recharge your emotional batteries and maintain balance in your life.</p>
        
        <h2>Conclusion</h2>
        <p>Emotional wellness is a journey, not a destination. By incorporating these strategies into your daily life, you can build resilience, improve your mental health, and create a more fulfilling life. Remember, seeking professional help when needed is a sign of strength, not weakness.</p>
    `,
    author: "Dr. Sarah Mensah",
    date: "January 15, 2025",
    category: "Mental Health",
    image: "/images/slid24.JPEG",
    readTime: "5 min read",
    slug: "understanding-emotional-wellness",
};

export const blogPosts: BlogPost[] = [
    {
        id: 2,
        title: "5 Signs Your Relationship Needs Professional Support",
        excerpt:
            "Recognizing when to seek couples counseling can be the first step toward healing and strengthening your partnership.",
        content: `
            <p>Relationships require work, but sometimes the challenges become too overwhelming to handle alone. Recognizing when professional help is needed can save your relationship and help both partners grow.</p>
            
            <h2>Sign 1: Constant Communication Breakdown</h2>
            <p>When conversations consistently turn into arguments or you find yourselves unable to discuss important topics without conflict, it may be time to seek help.</p>
            
            <h2>Sign 2: Emotional Distance</h2>
            <p>If you feel disconnected from your partner or notice a growing emotional gap, couples counseling can help rebuild intimacy and connection.</p>
            
            <h2>Sign 3: Trust Issues</h2>
            <p>Whether due to infidelity, broken promises, or other breaches of trust, professional support can guide the healing process.</p>
            
            <h2>Sign 4: Recurring Conflicts</h2>
            <p>When the same issues keep resurfacing without resolution, a therapist can help identify underlying patterns and provide tools for change.</p>
            
            <h2>Sign 5: Life Transitions</h2>
            <p>Major life changes like having children, career shifts, or moving can strain relationships. Professional support during these times can be invaluable.</p>
            
            <h2>Taking the First Step</h2>
            <p>Seeking couples counseling is a sign of strength and commitment to your relationship. It provides a safe space to address issues and learn healthier ways of relating to each other.</p>
        `,
        author: "Michael Osei",
        date: "January 12, 2025",
        category: "Relationships",
        image: "/images/img4.jpeg",
        readTime: "4 min read",
        slug: "signs-relationship-needs-support",
    },
    {
        id: 3,
        title: "Healing from Heartbreak: A Journey to Wholeness",
        excerpt:
            "Navigating the pain of loss and finding hope again. Learn how to process grief and rebuild your emotional foundation.",
        content: `
            <p>Heartbreak is one of the most painful human experiences. Whether from a breakup, divorce, or the loss of a loved one, the journey to healing requires time, patience, and self-compassion.</p>
            
            <h2>Understanding Grief</h2>
            <p>Grief is not linear. It comes in waves, and it's normal to experience a range of emotions from sadness and anger to confusion and even relief.</p>
            
            <h2>The Healing Process</h2>
            <h3>1. Allow Yourself to Feel</h3>
            <p>Suppressing emotions only prolongs the healing process. Give yourself permission to feel whatever comes up without judgment.</p>
            
            <h3>2. Seek Support</h3>
            <p>Don't go through this alone. Reach out to friends, family, or a therapist who can provide emotional support and guidance.</p>
            
            <h3>3. Practice Self-Care</h3>
            <p>Take care of your physical and emotional needs. Eat well, get enough sleep, and engage in activities that bring you comfort.</p>
            
            <h3>4. Create New Meaning</h3>
            <p>As you heal, you can begin to find meaning in your experience and use it as a catalyst for personal growth.</p>
            
            <h2>Moving Forward</h2>
            <p>Healing from heartbreak doesn't mean forgetting or erasing the past. It means integrating the experience into your life story and moving forward with wisdom and resilience.</p>
        `,
        author: "Ama Asante",
        date: "January 10, 2025",
        category: "Healing",
        image: "/images/img13.jpeg",
        readTime: "6 min read",
        slug: "healing-from-heartbreak",
    },
    {
        id: 4,
        title: "Building Healthy Communication in Your Relationship",
        excerpt:
            "Effective communication is the foundation of strong relationships. Discover techniques that foster understanding and connection.",
        content: `
            <p>Communication is the lifeblood of any relationship. When communication breaks down, relationships suffer. Here are key strategies for building healthy communication patterns.</p>
            
            <h2>Active Listening</h2>
            <p>Truly listening means giving your full attention, not just waiting for your turn to speak. Practice reflecting back what you hear to ensure understanding.</p>
            
            <h2>Use "I" Statements</h2>
            <p>Instead of blaming or accusing, express your feelings using "I" statements. For example, "I feel hurt when..." instead of "You always..."</p>
            
            <h2>Timing Matters</h2>
            <p>Choose the right time and place for important conversations. Avoid discussing sensitive topics when you're tired, stressed, or in public.</p>
            
            <h2>Non-Verbal Communication</h2>
            <p>Body language, tone of voice, and facial expressions often communicate more than words. Be aware of your non-verbal cues and what they're conveying.</p>
            
            <h2>Seek to Understand</h2>
            <p>Before responding, make sure you understand your partner's perspective. Ask clarifying questions and show genuine curiosity about their experience.</p>
        `,
        author: "Dr. Sarah Mensah",
        date: "January 8, 2025",
        category: "Relationships",
        image: "/images/img5.jpeg",
        readTime: "5 min read",
        slug: "healthy-communication-relationships",
    },
    {
        id: 5,
        title: "Managing Anxiety: Practical Tools for Daily Life",
        excerpt:
            "Anxiety doesn't have to control your life. Explore evidence-based techniques to manage anxious thoughts and feelings.",
        content: `
            <p>Anxiety is a common human experience, but when it becomes overwhelming, it can significantly impact your quality of life. Here are practical tools to help manage anxiety.</p>
            
            <h2>Breathing Techniques</h2>
            <p>Deep, controlled breathing can activate your body's relaxation response. Try the 4-7-8 technique: inhale for 4 counts, hold for 7, exhale for 8.</p>
            
            <h2>Grounding Exercises</h2>
            <p>When anxiety feels overwhelming, ground yourself by focusing on your five senses. Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.</p>
            
            <h2>Cognitive Reframing</h2>
            <p>Challenge anxious thoughts by asking yourself: "Is this thought helpful? Is it true? What's a more balanced perspective?"</p>
            
            <h2>Regular Exercise</h2>
            <p>Physical activity is one of the most effective natural anxiety reducers. Even a 20-minute walk can significantly reduce anxiety levels.</p>
            
            <h2>When to Seek Help</h2>
            <p>If anxiety is significantly impacting your daily life, relationships, or ability to function, consider seeking professional support from a therapist or counselor.</p>
        `,
        author: "Michael Osei",
        date: "January 5, 2025",
        category: "Mental Health",
        image: "/images/mockup/1.jpg",
        readTime: "7 min read",
        slug: "managing-anxiety-practical-tools",
    },
    {
        id: 6,
        title: "The Importance of Self-Care in Mental Wellness",
        excerpt:
            "Self-care isn't selfish—it's essential. Learn how to prioritize your well-being and create sustainable self-care practices.",
        content: `
            <p>Self-care is often misunderstood as being selfish or indulgent. In reality, it's a fundamental component of mental wellness and overall health.</p>
            
            <h2>What is Self-Care?</h2>
            <p>Self-care involves taking intentional actions to care for your physical, mental, and emotional well-being. It's about recognizing your needs and taking steps to meet them.</p>
            
            <h2>Types of Self-Care</h2>
            <h3>Physical Self-Care</h3>
            <p>This includes exercise, nutrition, sleep, and regular health check-ups. Your physical health directly impacts your mental health.</p>
            
            <h3>Emotional Self-Care</h3>
            <p>Allow yourself to feel and process emotions. This might involve journaling, therapy, or talking with trusted friends.</p>
            
            <h3>Social Self-Care</h3>
            <p>Nurture relationships that are supportive and positive. Set boundaries with people who drain your energy.</p>
            
            <h3>Spiritual Self-Care</h3>
            <p>Engage in activities that give you a sense of purpose and meaning, whether through religion, meditation, or connection with nature.</p>
            
            <h2>Making Self-Care Sustainable</h2>
            <p>Start small and be consistent. Even 10 minutes a day dedicated to self-care can make a significant difference in your overall well-being.</p>
        `,
        author: "Ama Asante",
        date: "January 3, 2025",
        category: "Wellness",
        image: "/images/mockup/2.jpg",
        readTime: "4 min read",
        slug: "importance-self-care-mental-wellness",
    },
    {
        id: 7,
        title: "Navigating Family Dynamics: Finding Balance and Harmony",
        excerpt:
            "Family relationships can be complex. Discover strategies for improving communication and resolving conflicts with loved ones.",
        content: `
            <p>Family relationships are among the most important in our lives, but they can also be the most challenging. Navigating family dynamics requires patience, understanding, and sometimes professional guidance.</p>
            
            <h2>Understanding Family Patterns</h2>
            <p>Every family has its own patterns of communication, conflict resolution, and emotional expression. Recognizing these patterns is the first step toward positive change.</p>
            
            <h2>Setting Healthy Boundaries</h2>
            <p>Boundaries are essential in family relationships. They help protect your emotional well-being while maintaining connection with loved ones.</p>
            
            <h2>Improving Communication</h2>
            <p>Family therapy can provide tools for improving communication, resolving conflicts, and building stronger, healthier relationships.</p>
            
            <h2>Managing Expectations</h2>
            <p>Unrealistic expectations can lead to disappointment and conflict. Learning to accept family members as they are while still setting boundaries is key.</p>
            
            <h2>When to Seek Help</h2>
            <p>If family conflicts are causing significant distress or impacting your daily life, family therapy can provide a safe space to address issues and work toward resolution.</p>
        `,
        author: "Dr. Sarah Mensah",
        date: "December 30, 2024",
        category: "Family",
        image: "/images/mockup/3.jpg",
        readTime: "6 min read",
        slug: "navigating-family-dynamics",
    },
    {
        id: 8,
        title: "Overcoming Trauma: Steps Toward Recovery",
        excerpt:
            "Healing from trauma is possible. Learn about trauma-informed approaches and the path to recovery and resilience.",
        content: `
            <p>Trauma can have profound and lasting effects, but recovery is possible. Understanding trauma and accessing appropriate support are crucial steps in the healing journey.</p>
            
            <h2>Understanding Trauma</h2>
            <p>Trauma is a response to a deeply distressing or disturbing event that overwhelms an individual's ability to cope. It can result from a single event or ongoing experiences.</p>
            
            <h2>The Impact of Trauma</h2>
            <p>Trauma can affect every aspect of life—emotional, physical, mental, and relational. Common responses include anxiety, depression, difficulty trusting others, and physical symptoms.</p>
            
            <h2>Trauma-Informed Therapy</h2>
            <p>Trauma-informed therapy approaches recognize the widespread impact of trauma and create a safe, supportive environment for healing.</p>
            
            <h2>Steps Toward Recovery</h2>
            <h3>1. Safety and Stabilization</h3>
            <p>Creating a sense of safety is the foundation of trauma recovery. This may involve establishing routines, boundaries, and support systems.</p>
            
            <h3>2. Processing Trauma</h3>
            <p>With professional support, you can begin to process traumatic memories in a safe, controlled way.</p>
            
            <h3>3. Reconnection</h3>
            <p>As healing progresses, you can work on rebuilding connections with yourself and others.</p>
            
            <h2>Hope and Healing</h2>
            <p>Recovery from trauma is a journey, not a destination. With appropriate support and treatment, it's possible to heal and build a fulfilling life.</p>
        `,
        author: "Michael Osei",
        date: "December 28, 2024",
        category: "Healing",
        image: "/images/mockup/5.jpg",
        readTime: "8 min read",
        slug: "overcoming-trauma-recovery",
    },
    {
        id: 9,
        title: "Teen Mental Health: Supporting Young People Through Challenges",
        excerpt:
            "Understanding the unique mental health needs of teenagers and how to provide effective support during difficult times.",
        content: `
            <p>Adolescence is a time of significant change and growth, which can bring unique mental health challenges. Understanding how to support teens is crucial for their well-being.</p>
            
            <h2>Understanding Teen Mental Health</h2>
            <p>Teenagers face unique pressures including academic stress, social media, peer relationships, and identity development. These factors can contribute to mental health challenges.</p>
            
            <h2>Signs to Watch For</h2>
            <p>Changes in behavior, mood, sleep patterns, or academic performance can indicate a teen may be struggling. Withdrawal from activities or relationships is also a red flag.</p>
            
            <h2>How to Support Teens</h2>
            <h3>1. Open Communication</h3>
            <p>Create a safe, non-judgmental space for teens to express their feelings and concerns.</p>
            
            <h3>2. Validate Their Experience</h3>
            <p>Teen emotions are real and valid, even if the situations seem minor from an adult perspective.</p>
            
            <h3>3. Seek Professional Help</h3>
            <p>If you're concerned about a teen's mental health, don't hesitate to seek professional support. Early intervention is key.</p>
            
            <h2>Resources and Support</h2>
            <p>There are many resources available for teen mental health, including school counselors, therapists specializing in adolescent therapy, and crisis hotlines.</p>
            
            <h2>Breaking the Stigma</h2>
            <p>Normalizing conversations about mental health and seeking help can reduce stigma and encourage teens to reach out when they need support.</p>
        `,
        author: "Ama Asante",
        date: "December 25, 2024",
        category: "Youth",
        image: "/images/mockup/6.jpg",
        readTime: "5 min read",
        slug: "teen-mental-health-support",
    },
];

// Get all blog posts including featured
export function getAllBlogPosts(): BlogPost[] {
    return [featuredPost, ...blogPosts];
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    const allPosts = getAllBlogPosts();
    return allPosts.find((post) => post.slug === slug);
}

