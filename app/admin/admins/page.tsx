"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminsPage() {
    const router = useRouter();
    const [authenticating, setAuthenticating] = useState(true);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            // Check if any admins exist first
            try {
                const checkResponse = await fetch("/api/admins");
                const checkData = await checkResponse.json();

                // If no admins exist, allow access without auth (for first admin creation)
                if (!checkData.success || (checkData.admins && checkData.admins.length === 0)) {
                    setAuthenticating(false);
                    fetchAdmins();
                    return;
                }

                // If admins exist, require authentication
                const token = localStorage.getItem("adminToken");
                if (!token) {
                    router.push("/admin/login");
                    return;
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
                } else {
                    setAuthenticating(false);
                    fetchAdmins();
                }
            } catch {
                // If API fails, try to proceed (might be first admin)
                setAuthenticating(false);
                fetchAdmins();
            }
        };

        verifyAuth();
    }, [router]);

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };

            // Only add auth header if token exists
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch("/api/admins", {
                headers,
            });

            const data = await response.json();
            if (data.success) {
                setAdmins(data.admins || []);
            } else {
                // If no admins exist, allow showing the form
                if (data.error?.includes("Unauthorized") || data.error?.includes("Forbidden")) {
                    setAdmins([]);
                } else {
                    setError(data.error || "Failed to fetch admins");
                }
            }
        } catch (err) {
            // If error, assume no admins exist yet
            setAdmins([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setSubmitting(true);

        try {
            const token = localStorage.getItem("adminToken");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };

            // Only add auth header if token exists (for first admin creation)
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "admin",
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowAddForm(false);
                setFormData({ name: "", email: "", password: "", confirmPassword: "" });

                // If this is the first admin and token is returned, save it
                if (data.token) {
                    localStorage.setItem("adminToken", data.token);
                    localStorage.setItem("adminUser", JSON.stringify(data.user));
                    document.cookie = `adminToken=${data.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;
                }

                fetchAdmins(); // Refresh the list
                alert("Admin created successfully!");
            } else {
                setError(data.error || "Failed to create admin");
            }
        } catch (err) {
            setError("Failed to create admin. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSuspend = async (adminId: string, adminEmail: string) => {
        // Prevent suspending protected email
        if (adminEmail === "chukkydave@gmail.com") {
            alert("This admin cannot be suspended");
            return;
        }

        if (!confirm("Are you sure you want to suspend this admin?")) {
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            const response = await fetch(`/api/admins/${adminId}/suspend`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "SUSPENDED" }),
            });

            const data = await response.json();
            if (data.success) {
                fetchAdmins(); // Refresh the list
                alert("Admin suspended successfully");
            } else {
                alert(data.error || "Failed to suspend admin");
            }
        } catch (err) {
            alert("Failed to suspend admin");
        }
    };

    if (authenticating || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-purple border-t-transparent"></div>
                    <div className="text-lg text-slate-600">
                        {authenticating ? "Verifying authentication..." : "Loading admins..."}
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
                    <h1 className="text-2xl font-bold text-slate-900">Admin Management</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="rounded-lg bg-brand-purple px-4 py-2 font-semibold text-white transition hover:bg-brand-purple/90"
                        >
                            {showAddForm ? "Cancel" : "+ Add Admin"}
                        </button>
                        <Link
                            href="/admin"
                            className="rounded-lg border-2 border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
                )}

                {/* Add Admin Form */}
                {showAddForm && (
                    <div className="mb-8 rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-xl font-bold text-slate-900">Add New Admin</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full rounded-lg border-2 border-purple-200 px-4 py-2 focus:border-brand-purple focus:outline-none"
                                    placeholder="Admin Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full rounded-lg border-2 border-purple-200 px-4 py-2 focus:border-brand-purple focus:outline-none"
                                    placeholder="admin@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={6}
                                    className="w-full rounded-lg border-2 border-purple-200 px-4 py-2 focus:border-brand-purple focus:outline-none"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    minLength={6}
                                    className="w-full rounded-lg border-2 border-purple-200 px-4 py-2 focus:border-brand-purple focus:outline-none"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full rounded-lg bg-brand-purple px-4 py-2 font-semibold text-white transition hover:bg-brand-purple/90 disabled:opacity-50"
                            >
                                {submitting ? "Creating..." : "Create Admin"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Admins Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                    Role
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
                            {admins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No admins found.
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-slate-50">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">{admin.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-900">{admin.email}</td>
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            <span className="rounded-full bg-brand-purple px-3 py-1 text-xs font-semibold text-white">
                                                {admin.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(admin.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {admin.email === "chukkydave@gmail.com" ? (
                                                <span className="text-xs text-slate-400 italic">Protected</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleSuspend(admin._id, admin.email)}
                                                    className="rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
                                                >
                                                    Suspend
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

