"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Blog {
    _id: string | { toString(): string }; // MongoDB ObjectId
    id?: string; // For compatibility
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
    createdAt: Date | string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [authenticating, setAuthenticating] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                router.push("/admin/login");
                return false;
            }

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
                return false;
            }
            return true;
        } catch {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            router.push("/admin/login");
            return false;
        }
    };

    useEffect(() => {
        // Check authentication first before showing any content
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                router.push("/admin/login");
                return;
            }

            const isAuthenticated = await verifyToken();
            if (isAuthenticated) {
                setAuthenticating(false);
                fetchBlogs();
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, router]);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch(`/api/blogs?page=${page}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                setBlogs(data.blogs);
                setTotalPages(data.pagination?.totalPages || 1);
            } else {
                setError(data.error || "Failed to fetch blogs");
            }
        } catch (err) {
            setError("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) {
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch(`/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                fetchBlogs();
            } else {
                alert(data.error || "Failed to delete blog");
            }
        } catch (err) {
            alert("Failed to delete blog");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        // Clear cookie
        document.cookie = "adminToken=; path=/; max-age=0";
        router.push("/admin/login");
    };

    // Show loading state while authenticating or loading data
    if (authenticating || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple border-t-transparent"></div>
                    <div className="text-lg text-slate-600">
                        {authenticating ? "Verifying authentication..." : "Loading blogs..."}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-slate-900">Blog Management</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/blogs/new"
                            className="rounded-lg bg-brand-purple px-4 py-2 font-semibold text-white transition hover:bg-brand-purple/90"
                        >
                            + New Blog
                        </Link>
                        <Link
                            href="/admin/admins"
                            className="rounded-lg border-2 border-brand-purple px-4 py-2 font-semibold text-brand-purple transition hover:bg-purple-50"
                        >
                            Manage Admins
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
                )}

                {/* Blogs Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No blogs found. Create your first blog!
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => {
                                    const blogId = typeof blog._id === "string" ? blog._id : blog._id.toString();
                                    return (
                                        <tr key={blogId} className="hover:bg-slate-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">{blogId.slice(-8)}</td>
                                            <td className="px-6 py-4">
                                                {blog.image1 ? (
                                                    <div className="relative h-16 w-16 overflow-hidden rounded">
                                                        <Image
                                                            src={blog.image1.startsWith("/") ? blog.image1 : `/uploads/blogs/${blog.image1}`}
                                                            alt={blog.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-16 w-16 rounded bg-slate-200" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs truncate text-sm font-medium text-slate-900">{blog.title}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${blog.status === "PUBLISHED"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/blogs/${blogId}/edit`}
                                                        className="text-brand-purple hover:text-brand-purple/80"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blogId)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="rounded-lg border-2 border-slate-300 px-4 py-2 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 text-slate-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="rounded-lg border-2 border-slate-300 px-4 py-2 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

