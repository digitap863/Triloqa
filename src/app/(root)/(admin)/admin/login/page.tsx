"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function AdminLoginPage() {
    const router = useRouter();
    const { adminLogin, loading, error, clearError } = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        const result = await adminLogin(email, password);

        if (result.success) {
            router.push("/admin/dashboard");
        }
    };

    return (
        <main className="min-h-screen w-full flex font-sans">
            {/* ─── LEFT PANEL ─── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0E171A] flex-col items-center justify-center">
                {/* subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(#1D8F2C 1px, transparent 1px), linear-gradient(90deg, #1D8F2C 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* green accent bar top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1D8F2C]" />

                <div className="relative z-10 flex flex-col items-center text-center px-12 space-y-8">
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/logo1.png"
                            width={130}
                            height={60}
                            alt="Triloqa Logo"
                            className="brightness-0 invert"
                        />
                    </Link>

                    {/* Shield icon */}
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#1D8F2C] flex items-center justify-center">
                        <ShieldCheck size={44} className="text-[#1D8F2C]" />
                    </div>

                    <div className="space-y-3 max-w-xs">
                        <h2 className="text-3xl font-bold text-white leading-tight">
                            Secure Admin<br />Access
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed">
                            This area is restricted to authorised administrators only.
                            All activity is monitored and logged.
                        </p>
                    </div>

                    {/* decorative stat strips */}

                </div>

                {/* bottom back-to-site link */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <Link
                        href="/"
                        className="text-white/30 hover:text-white/60 text-xs transition-colors"
                    >
                        ← Back to website
                    </Link>
                </div>
            </div>

            {/* ─── RIGHT PANEL ─── */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* top green bar */}
                <div className="h-1 bg-[#1D8F2C] w-full" />

                <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-16 bg-[#f4f4f4]">

                    {/* Mobile logo */}
                    <div className="flex flex-col items-center mb-10 lg:hidden">
                        <Link href="/">
                            <Image src="/logo1.png" width={110} height={52} alt="Triloqa Logo" />
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="w-full max-w-md bg-white shadow-lg">
                        {/* Card header stripe */}
                        <div className="bg-[#1b1e2e] px-8 py-6">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={20} className="text-[#1D8F2C]" />
                                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">
                                    Administrator Portal
                                </p>
                            </div>
                            <h1 className="text-white text-2xl font-bold mt-2">
                                Sign In to Dashboard
                            </h1>
                        </div>

                        {/* Form body */}
                        <form onSubmit={handleSubmit} className="px-8 pt-8 pb-10 space-y-6">

                            {/* Error message */}
                            {error && (
                                <div className="border border-red-300 bg-red-50 text-red-600 text-sm px-4 py-3">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="admin-email"
                                    className="block text-sm font-semibold text-[#232434]"
                                >
                                    Email Address <span className="text-[#1D8F2C]">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1D8F2C]">
                                        <Mail size={17} />
                                    </span>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@triloqa.com"
                                        className="w-full border border-gray-300 pl-11 pr-4 py-3 text-[#232434] placeholder:text-gray-400 focus:outline-none focus:border-[#1D8F2C] focus:ring-1 focus:ring-[#1D8F2C] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="admin-password"
                                    className="block text-sm font-semibold text-[#232434]"
                                >
                                    Password <span className="text-[#1D8F2C]">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1D8F2C]">
                                        <Lock size={17} />
                                    </span>
                                    <input
                                        id="admin-password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 pl-11 pr-12 py-3 text-[#232434] placeholder:text-gray-400 focus:outline-none focus:border-[#1D8F2C] focus:ring-1 focus:ring-[#1D8F2C] transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D8F2C] transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot password */}
                            <div className="flex justify-end -mt-2">
                                <Link
                                    href="#"
                                    className="text-xs text-[#1D8F2C] hover:underline font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                id="admin-login-submit"
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1D8F2C] text-white py-4 font-semibold flex items-center justify-center gap-3 hover:bg-green-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Signing in…
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            {/* Divider note */}
                            <p className="text-center text-xs text-gray-400 pt-2">
                                Protected area — unauthorised access is prohibited.
                            </p>
                        </form>
                    </div>

                    {/* Bottom back link (mobile / desktop both) */}
                    <div className="mt-8">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-[#1D8F2C] text-sm transition-colors font-medium"
                        >
                            ← Back to website
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
