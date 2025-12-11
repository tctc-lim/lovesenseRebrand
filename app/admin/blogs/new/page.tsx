"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NewBlogPage() {
    const router = useRouter();
    const [authenticating, setAuthenticating] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        readTime: "",
        content1: "",
        content2: "",
        tag1: "",
        tag2: "",
        tag3: "",
        status: "PENDING",
    });
    const [image1, setImage1] = useState<string>("");
    const [image2, setImage2] = useState<string>("");
    const [uploading, setUploading] = useState({ image1: false, image2: false });

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                router.push("/admin/login");
                return;
            }

            try {
                const response = await fetch("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (!data.success) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminUser");
                    router.push("/admin/login");
                } else {
                    setAuthenticating(false);
                }
            } catch {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
                router.push("/admin/login");
            }
        };

        verifyAuth();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageKey = `image${imageNumber}` as "image1" | "image2";
        setUploading((prev) => ({ ...prev, [imageKey]: true }));

        try {
            const token = localStorage.getItem("adminToken");
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/blogs/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                if (imageNumber === 1) {
                    setImage1(data.url);
                } else {
                    setImage2(data.url);
                }
            } else {
                alert(data.error || "Failed to upload image");
            }
        } catch (err) {
            alert("Failed to upload image");
        } finally {
            setUploading((prev) => ({ ...prev, [imageKey]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    image1,
                    image2,
                }),
            });

            const data = await response.json();
            if (data.success) {
                router.push("/admin");
            } else {
                setError(data.error || "Failed to create blog");
            }
        } catch (err) {
            setError("Failed to create blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (authenticating) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple border-t-transparent"></div>
                    <div className="text-lg text-slate-600">Verifying authentication...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create New Blog</h1>
                    <Link
                        href="/admin"
                        className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-8 shadow">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
                            Title *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            placeholder="Enter blog title"
                        />
                    </div>

                    {/* Read Time */}
                    <div>
                        <label htmlFor="readTime" className="mb-2 block text-sm font-semibold text-slate-700">
                            Read Time *
                        </label>
                        <input
                            id="readTime"
                            name="readTime"
                            type="text"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            placeholder="e.g., 5 min read"
                        />
                    </div>

                    {/* Images */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Image 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 1)}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            />
                            {uploading.image1 && <p className="mt-2 text-sm text-slate-500">Uploading...</p>}
                            {image1 && (
                                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-lg">
                                    <Image src={image1} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Image 2</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 2)}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            />
                            {uploading.image2 && <p className="mt-2 text-sm text-slate-500">Uploading...</p>}
                            {image2 && (
                                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-lg">
                                    <Image src={image2} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content 1 */}
                    <div>
                        <label htmlFor="content1" className="mb-2 block text-sm font-semibold text-slate-700">
                            Content 1 * (HTML supported)
                        </label>
                        <textarea
                            id="content1"
                            name="content1"
                            value={formData.content1}
                            onChange={handleInputChange}
                            required
                            rows={10}
                            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            placeholder="Enter main content (HTML supported)"
                        />
                    </div>

                    {/* Content 2 */}
                    <div>
                        <label htmlFor="content2" className="mb-2 block text-sm font-semibold text-slate-700">
                            Content 2 (HTML supported)
                        </label>
                        <textarea
                            id="content2"
                            name="content2"
                            value={formData.content2}
                            onChange={handleInputChange}
                            rows={10}
                            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                            placeholder="Enter additional content (optional)"
                        />
                    </div>

                    {/* Tags */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label htmlFor="tag1" className="mb-2 block text-sm font-semibold text-slate-700">
                                Tag 1
                            </label>
                            <input
                                id="tag1"
                                name="tag1"
                                type="text"
                                value={formData.tag1}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                                placeholder="Tag 1"
                            />
                        </div>
                        <div>
                            <label htmlFor="tag2" className="mb-2 block text-sm font-semibold text-slate-700">
                                Tag 2
                            </label>
                            <input
                                id="tag2"
                                name="tag2"
                                type="text"
                                value={formData.tag2}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                                placeholder="Tag 2"
                            />
                        </div>
                        <div>
                            <label htmlFor="tag3" className="mb-2 block text-sm font-semibold text-slate-700">
                                Tag 3
                            </label>
                            <input
                                id="tag3"
                                name="tag3"
                                type="text"
                                value={formData.tag3}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                                placeholder="Tag 3"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="mb-2 block text-sm font-semibold text-slate-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="PUBLISHED">Published</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-brand-purple px-6 py-3 font-semibold text-white transition hover:bg-brand-purple/90 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Blog"}
                        </button>
                        <Link
                            href="/admin"
                            className="rounded-lg border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

