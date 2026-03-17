"use client";

import { useEffect } from "react";
import { Phone, Mail, MapPin, ChevronRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUserServiceStore } from "@/stores/user/serviceStore";
import { useUserBlogStore } from "@/stores/user/blogStore";

const Footer = () => {
    const { services, fetchServices } = useUserServiceStore();
    const { blogs, fetchBlogs } = useUserBlogStore();

    useEffect(() => {
        // Fetch limited items for footer
        fetchServices({ limit: 5 });
        fetchBlogs({ limit: 2 });
    }, [fetchServices, fetchBlogs]);

    return (
        <footer className="bg-[#282832] text-white relative font-sans">

            {/* TOP CONTACT STRIP */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* CALL */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#1D8F2C] flex items-center justify-center group hover:border-solid transition-all duration-300">
                            <Phone size={24} className="text-[#1D8F2C] group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70 font-medium">Call Us</p>
                            <p className="text-xl font-bold hover:text-[#1D8F2C] transition-colors cursor-pointer">+91 92078 56999</p>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center gap-5 md:border-x md:border-white/10 md:px-10">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#1D8F2C] flex items-center justify-center group hover:border-solid transition-all duration-300 shrink-0">
                            <Mail size={24} className="text-[#1D8F2C] group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70 font-medium">Mail Us</p>
                            <p className="text-xl font-bold hover:text-[#1D8F2C] transition-colors cursor-pointer text-nowrap">triloqasales@gmail.com</p>
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#1D8F2C] flex items-center justify-center shrink-0 group hover:border-solid transition-all duration-300">
                            <MapPin size={24} className="text-[#1D8F2C] group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70 font-medium">Location</p>
                            <p className="text-sm font-semibold leading-relaxed">Second Floor, Statue Junction, Lotus City Centre, FACT Nagar, Thrippunithura, Kochi, Ernakulam, Kerala 682301</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

                {/* BRAND */}
                <div>
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Image
                                src="/logo1.png"
                                width={180}
                                height={60}
                                alt="logo"
                                className="brightness-0 invert object-contain"
                            />
                        </Link>
                    </div>

                    <p className="text-white/70 mt-6 leading-relaxed italic">
                        "Brighten Your home, Lighten your bill"
                    </p>

                    <div className="flex gap-4 mt-8">
                        {[
                            { icon: <Facebook size={18} />, href: "#" },
                            { icon: <Twitter size={18} />, href: "#" },
                            { icon: <Linkedin size={18} />, href: "#" },
                            { icon: <Youtube size={18} />, href: "#" },
                        ].map((social, idx) => (
                            <Link
                                key={idx}
                                href={social.href}
                                className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-md hover:bg-[#1D8F2C] hover:border-[#1D8F2C] hover:-translate-y-1 transition-all duration-300"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="text-xl font-bold mb-8 relative">
                        Quick Links
                        <span className="absolute left-0 -bottom-2 w-10 h-1 bg-[#1D8F2C]" />
                    </h4>

                    <ul className="space-y-4 text-white/80">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Services", href: "/services" },
                            { name: "About", href: "/about" },
                            { name: "Blog", href: "/blogs" },
                            { name: "Contact Us", href: "/contactus" },
                        ].map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 hover:text-[#1D8F2C] hover:translate-x-1 transition-all duration-300 group"
                                >
                                    <ChevronRight size={16} className="text-[#1D8F2C] group-hover:scale-110" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SERVICES */}
                <div>
                    <h4 className="text-xl font-bold mb-8 relative">
                        Our Services
                        <span className="absolute left-0 -bottom-2 w-10 h-1 bg-[#1D8F2C]" />
                    </h4>

                    <ul className="space-y-4 text-white/80">
                        {services.slice(0, 5).map((service, idx) => (
                            <li key={service._id || idx}>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="flex items-center gap-2 hover:text-[#1D8F2C] hover:translate-x-1 transition-all duration-300 group"
                                >
                                    <ChevronRight size={16} className="text-[#1D8F2C] group-hover:scale-110" />
                                    <span className="line-clamp-1">{service.title}</span>
                                </Link>
                            </li>
                        ))}
                        {services.length === 0 && ["Consultancy", "Solar System", "Solar Panel"].map((fallback, idx) => (
                            <li key={idx} className="flex items-center gap-2 opacity-50">
                                <ChevronRight size={16} className="text-[#1D8F2C]" />
                                {fallback}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RECENT POSTS */}
                <div>
                    <h4 className="text-xl font-bold mb-8 relative">
                        Recent Blogs
                        <span className="absolute left-0 -bottom-2 w-10 h-1 bg-[#1D8F2C]" />
                    </h4>

                    <div className="space-y-6">
                        {blogs.slice(0, 2).map((blog, idx) => (
                            <Link
                                key={blog._id || idx}
                                href={`/blogs/${blog.slug}`}
                                className="flex gap-4 group"
                            >
                                <div className="w-16 h-16 shrink-0 relative overflow-hidden rounded-md border border-white/10">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <p className="text-xs text-[#1D8F2C] font-semibold mb-1">
                                        {blog.date}
                                    </p>
                                    <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#1D8F2C] transition-colors">
                                        {blog.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        {blogs.length === 0 && (
                            <p className="text-sm text-white/40 italic">No recent posts found.</p>
                        )}
                    </div>
                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/5 bg-[#23232C]">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:row items-center justify-between gap-4 text-sm text-white/50">
                    <p>© {new Date().getFullYear()} <span className="text-[#1D8F2C] font-bold">Tapclone</span>. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
