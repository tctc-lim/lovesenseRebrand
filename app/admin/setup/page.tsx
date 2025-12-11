"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SetupAdminPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role: "admin" }),
            });

            const data = await response.json();

            if (data.success && data.token) {
                setSuccess(true);
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));
                // Also set cookie for middleware to see (server-side)
                document.cookie = `adminToken=${data.token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;
                setTimeout(() => {
                    router.push("/admin");
                }, 2000);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple px-4">
                <div className="w-full max-w-md">
                    <div className="rounded-3xl bg-white p-8 shadow-2xl text-center">
                        <div className="mb-4 text-6xl">✅</div>
                        <h1 className="mb-4 text-2xl font-bold text-slate-900">Admin Created Successfully!</h1>
                        <p className="text-slate-600">Redirecting to admin dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple px-4">
            <div className="w-full max-w-md">
                <div className="rounded-3xl bg-white p-8 shadow-2xl">
                    <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">Create Admin Account</h1>
                    <p className="mb-6 text-center text-sm text-slate-600">Set up your first admin user</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
                        )}
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
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
                                minLength={6}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 focus:border-brand-purple focus:outline-none"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-brand-purple px-4 py-3 font-semibold text-white transition hover:bg-brand-purple/90 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Admin Account"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/admin/login" className="text-brand-purple hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

