// Blog type matching MongoDB document
type Blog = {
    _id: string | { toString(): string };
    title: string;
    readTime: string;
    image1: string | null;
    image2: string | null;
    content1: string;
    content2: string | null;
    tag1: string | null;
    tag2: string | null;
    tag3: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

// Convert database blog format to frontend format
export function convertDbBlogToFrontend(blog: Blog): {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    date: string;
    category: string;
    image: string;
    image1: string | null;
    image2: string | null;
    tags: string[];
    readTime: string;
    slug: string;
} {
    // Get ID as string
    const blogId = typeof blog._id === "string" ? blog._id : blog._id.toString();

    // Generate slug from title
    const slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Use tag1 as category, or default to "General"
    const category = blog.tag1 || "General";

    // Collect all tags (non-null)
    const tags: string[] = [];
    if (blog.tag1) tags.push(blog.tag1);
    if (blog.tag2) tags.push(blog.tag2);
    if (blog.tag3) tags.push(blog.tag3);

    // Create excerpt from content1 (first 150 characters)
    const excerpt = blog.content1
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .substring(0, 150)
        .trim() + "...";

    // Combine content1 and content2 for full content
    // Also insert image2 if it exists
    let content = blog.content1;
    if (blog.content2) {
        content = `<div>${blog.content1}</div>`;
        // Insert image2 between content1 and content2 if it exists
        if (blog.image2) {
            content += `<div class="my-8 w-full overflow-hidden rounded-2xl"><img src="${blog.image2}" alt="${blog.title}" class="w-full h-auto object-cover" loading="lazy" /></div>`;
        }
        content += `<div>${blog.content2}</div>`;
    } else if (blog.image2) {
        // If only image2 exists without content2, add it after content1
        content += `<div class="my-8 w-full overflow-hidden rounded-2xl"><img src="${blog.image2}" alt="${blog.title}" class="w-full h-auto object-cover" loading="lazy" /></div>`;
    }

    // Format date
    const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Convert MongoDB ObjectId to number for frontend compatibility
    const numericId = parseInt(blogId.slice(-8), 16) || 0;

    return {
        id: numericId,
        title: blog.title,
        excerpt,
        content,
        author: "Love Sense Team",
        date,
        category,
        image: blog.image1 || "/images/default-blog.jpg",
        image1: blog.image1,
        image2: blog.image2,
        tags,
        readTime: blog.readTime,
        slug: `${blogId}-${slug}`,
    };
}
