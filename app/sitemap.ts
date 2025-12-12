import { MetadataRoute } from 'next';
import { getBlogsCollection } from '@/lib/mongodb';
import { ObjectId, WithId, Document } from 'mongodb';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mylovesense.online';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/booking`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookie-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/refund-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Dynamic blog posts
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        interface BlogProjection extends Document {
            _id: ObjectId;
            title: string;
            updatedAt?: Date;
            createdAt?: Date;
        }

        const blogsCollection = await getBlogsCollection();
        const blogs = (await blogsCollection
            .find({ status: 'PUBLISHED' })
            .project({ _id: 1, title: 1, updatedAt: 1, createdAt: 1 })
            .toArray()) as WithId<BlogProjection>[];

        blogPages = blogs.map((blog) => {
            // Generate slug from ID and title (matching the format used in the app)
            const id = blog._id.toString();
            const slugTitle = blog.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') || '';
            const slug = `${id}-${slugTitle}`;

            return {
                url: `${baseUrl}/blog/${slug}`,
                lastModified: blog.updatedAt
                    ? new Date(blog.updatedAt).toISOString()
                    : blog.createdAt
                        ? new Date(blog.createdAt).toISOString()
                        : currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            };
        });
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
    }

    // Dynamic service pages
    const serviceSlugs = [
        'private-counseling',
        'relationship-counseling',
        'marriage-counseling',
    ];

    const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...servicePages];
}

