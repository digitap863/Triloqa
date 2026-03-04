"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactMenuOpen, setContactMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blogs" },
        { name: "Contact", path: "/contactus" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 font-sans">
            {/* ================= TOP INFO BAR ================= */}
            <div className={` bg-[#1b1e2e] text-white text-[15px] ${scrolled ? "hidden" : "hidden md:flex"} `}>
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-6">
                        <span>✉ info@example.com</span>
                        <span>📞 +208-666-0112</span>
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
            <div
                className={`bg-white transition-shadow ${scrolled ? "shadow-md bg-black" : ""
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-[90px]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 ml-2">
                            <Image
                                src="/logo1.png"
                                width={100}
                                height={50}
                                alt="logo"
                            />
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
                            <div className="flex items-center gap-4">
                                <button
                                    className="text-[#1D8F2C]"
                                    onClick={() => setContactMenuOpen(true)}
                                >
                                    <Menu size={24} />
                                </button>
                            </div>
                        </nav>

                        {/* Right Icons */}

                    </div>
                </div>
            </div>

            {/* ================= MOBILE MENU (UNCHANGED LOGIC) ================= */}
            <div
                className={`fixed top-0 right-0 h-full  bg-[#F3F7FB] border-x-2 border-[#1D8F2C]  transition-transform duration-500 z-50 ${contactMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-6">
                    <button onClick={() => setContactMenuOpen(false)}>
                        <X size={30} className="text-white" />
                    </button>
                </div>

                
            </div>
            <div
                className={`fixed top-0 left-0 h-full w-full bg-[#0a0a0a] transition-transform duration-500 z-50 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-6">
                    <span className="text-white text-xl font-bold">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)}>
                        <X size={30} className="text-white" />
                    </button>
                </div>

                <nav className="flex flex-col px-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            href={link.path}
                            className="py-4 text-white border-b border-white/10"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;