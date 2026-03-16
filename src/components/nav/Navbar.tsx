"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Mail, ArrowRight, ChevronRight, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactMenuOpen, setContactMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blogs" },
        { name: "Gallery", path: "/gallery" },
        { name: "Contact", path: "/contactus" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 font-sans">
            {/* ================= TOP INFO BAR ================= */}
            <div className={`bg-[#1b1e2e] text-white text-[15px] ${scrolled ? "hidden" : "hidden md:flex"}`}>
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-6">
                        <span>✉ info@example.com</span>
                        <span>📞 +91 92078 56999</span>
                    </div>
                    <div className="flex items-center gap-4 text-base font-medium">
                        <span className="text-white">Follow Us:</span>
                        <Link href="#">f</Link>
                        <Link href="#">x</Link>
                        <Link href="#">in</Link>
                        <Link href="#">▶</Link>
                    </div>
                </div>
            </div>

            {/* ================= MAIN NAVBAR ================= */}
            <div className={`bg-white transition-shadow ${scrolled ? "shadow-md" : ""}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-[90px]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 ml-2">
                            <Image src="/logo1.png" width={100} height={50} alt="logo" />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-16">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    href={link.path}
                                    className="text-[#232434] font-medium hover:text-green-600"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <button
                                className="text-[#1D8F2C]"
                                onClick={() => setContactMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        </nav>

                        {/* Mobile Hamburger */}
                        <button
                            className="flex md:hidden items-center text-[#1D8F2C]"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= DESKTOP SIDE PANEL ================= */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-300 hidden md:block ${contactMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setContactMenuOpen(false)}
            />

            <div className={`fixed top-0 right-0 h-full w-[400px] bg-white transition-transform duration-500 z-[60] shadow-2xl flex flex-col ${contactMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-gray-50">
                    <Image src="/logo1.png" width={120} height={50} alt="logo" />
                    <button
                        onClick={() => setContactMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-[#232434]" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 flex-1 overflow-y-auto">
                    <div className="mt-8">
                        <h4 className="text-xl font-bold text-[#232434] mb-4">About Us</h4>
                        <p className="text-gray-500 leading-relaxed italic border-l-4 border-[#1D8F2C] pl-4">
                            "Brighten Your home, Lighten your bill"
                        </p>
                        <p className="text-gray-500 mt-4 leading-relaxed text-sm">
                            At Triloqa, we are committed to helping you transition to clean, renewable energy. Our expert team provides end-to-end solar solutions tailored to your specific needs, ensuring maximum efficiency and savings.
                        </p>
                    </div>

                    <div className="mt-10">
                        <h4 className="text-lg font-bold text-[#232434] mb-6 flex items-center gap-2">
                            <span className="w-1 h-5 bg-[#1D8F2C] inline-block" />
                            Contact Info
                        </h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 bg-green-50 rounded-lg flex items-center justify-center text-[#1D8F2C]">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Office Address</p>
                                    <p className="text-sm font-semibold text-[#232434] leading-relaxed">
                                        Lotus City Centre, Thrippunithura, Kochi, Kerala 682301
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 bg-green-50 rounded-lg flex items-center justify-center text-[#1D8F2C]">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-sm font-bold text-[#232434] hover:text-[#1D8F2C] transition-colors cursor-pointer">
                                        +91 92078 56999
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 shrink-0 bg-green-50 rounded-lg flex items-center justify-center text-[#1D8F2C]">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-sm font-bold text-[#232434] hover:text-[#1D8F2C] transition-colors cursor-pointer">
                                        Solar@Gmail.Com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            <Link href="#" className="w-10 h-10 bg-[#1b1e2e] text-white flex items-center justify-center rounded-md hover:bg-[#1D8F2C] hover:-translate-y-1 transition-all"><Facebook size={18} /></Link>
                            <Link href="#" className="w-10 h-10 bg-[#1b1e2e] text-white flex items-center justify-center rounded-md hover:bg-[#1D8F2C] hover:-translate-y-1 transition-all"><Twitter size={18} /></Link>
                            <Link href="#" className="w-10 h-10 bg-[#1b1e2e] text-white flex items-center justify-center rounded-md hover:bg-[#1D8F2C] hover:-translate-y-1 transition-all"><Linkedin size={18} /></Link>
                            <Link href="#" className="w-10 h-10 bg-[#1b1e2e] text-white flex items-center justify-center rounded-md hover:bg-[#1D8F2C] hover:-translate-y-1 transition-all"><Youtube size={18} /></Link>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                    <Link
                        href="/contactus"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#1D8F2C] text-white font-bold rounded hover:bg-green-700 transition-all shadow-lg shadow-green-200 group"
                    >
                        Free Consultation
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* ================= MOBILE MENU OVERLAY ================= */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[85vw] max-w-[320px] z-50 bg-[#0E171A] transition-transform duration-400 ease-in-out md:hidden flex flex-col overflow-hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >

                {/* Top bar: logo + close */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/logo1.png" width={88} height={42} alt="logo" className="brightness-0 invert" />
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col flex-1 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-5 py-4 border-b border-white/8 transition-colors duration-200 ${isActive
                                    ? "border-l-2 border-l-[#1D8F2C] pl-[18px] text-[#1D8F2C] bg-white/4"
                                    : "text-white/75 hover:text-white hover:bg-white/4"
                                    }`}
                            >
                                <span className="text-[15px] font-semibold">{link.name}</span>
                                <ChevronRight size={14} className={isActive ? "text-[#1D8F2C]" : "text-white/25"} />
                            </Link>
                        );
                    })}

                    {/* CTA */}
                    <div className="px-5 pt-6">
                        <Link
                            href="/contactus"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 bg-[#1D8F2C] text-white text-sm font-semibold px-5 py-3 hover:bg-green-700 transition-colors"
                        >
                            Get a Free Quote
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </nav>

                {/* Bottom contact strip */}
                <div className="border-t border-white/10 px-5 py-5 space-y-3">
                    <a href="tel:+2086660112" className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors">
                        <Phone size={14} className="text-[#1D8F2C] shrink-0" />
                        +208-666-0112
                    </a>
                    <a href="mailto:info@example.com" className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors">
                        <Mail size={14} className="text-[#1D8F2C] shrink-0" />
                        info@example.com
                    </a>

                    {/* Social row */}
                    <div className="flex items-center gap-2 pt-1">
                        {["f", "x", "in", "▶"].map((icon, i) => (
                            <Link
                                key={i}
                                href="#"
                                className="w-7 h-7 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#1D8F2C] hover:text-[#1D8F2C] text-xs transition-colors"
                            >
                                {icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;