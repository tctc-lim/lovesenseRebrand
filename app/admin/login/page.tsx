"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success && data.token) {
                // Store token in localStorage for API calls
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));

                // Also set cookie for middleware to see (server-side)
                document.cookie = `adminToken=${data.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;

                // Use replace to avoid adding to history
                router.replace("/admin");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple px-4">
            <div className="w-full max-w-md">
                <div className="rounded-3xl bg-white p-8 shadow-2xl">
                    <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">Admin Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
                        )}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-brand-purple px-4 py-3 font-semibold text-white transition hover:bg-brand-purple/90 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-slate-600">
                        <Link href="/" className="text-brand-purple hover:underline">
                            Back to Home
                        </Link>
                        {" • "}
                        <Link href="/admin/setup" className="text-brand-purple hover:underline">
                            Create Admin Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
