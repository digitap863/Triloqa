"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, User, Tag, ArrowRight, ChevronRight } from "lucide-react";
import { useUserBlogStore } from "@/stores/user/blogStore";

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
const BlogDetailContent = () => {
    const { slug } = useParams();
    const { currentBlog: blog, recentBlogs, loading, fetchBlogBySlug } = useUserBlogStore();

    useEffect(() => {
        if (slug) {
            fetchBlogBySlug(slug as string);
        }
    }, [slug, fetchBlogBySlug]);

    if (loading || !blog) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d8f2c]"></div>
            </div>
        );
    }

    return (
        <section className="w-full bg-white py-14 lg:py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                    {/* ────────── LEFT: Main Blog Content ────────── */}
                    <article data-aos="fade-right" data-aos-duration="1000" className="flex-1 min-w-0">

                        {/* Hero Image */}
                        <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] overflow-hidden">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Meta Row */}
                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#585858]">
                            <span className="flex items-center gap-1.5">
                                <CalendarDays size={15} className="text-[#1d8f2c]" />
                                {blog.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User size={15} className="text-[#1d8f2c]" />
                                {blog.author}
                            </span>
                            {blog.tags && blog.tags.length > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <Tag size={15} className="text-[#1d8f2c]" />
                                    {blog.tags[0]}
                                </span>
                            )}
                        </div>

                        {/* Blog Heading */}
                        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#232434] leading-snug">
                            {blog.title}
                        </h2>

                        {/* Divider */}
                        <div className="mt-5 mb-7 w-16 h-1 bg-[#1d8f2c]" />

                        {/* Blog Body */}
                        <div className="text-[#585858] text-sm sm:text-base leading-relaxed rich-text-content">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: typeof blog.content === 'string'
                                        ? blog.content
                                        : (Array.isArray(blog.content)
                                            ? (blog.content as any).map((s: any) => `<h3>${s.heading}</h3><div>${s.body}</div>`).join('')
                                            : "")
                                }}
                            />
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-10 flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold text-[#232434] mr-1">Tags:</span>
                                {blog.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-xs sm:text-sm border border-gray-200 text-[#585858] hover:border-[#1d8f2c] hover:text-[#1d8f2c] transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </article>

                    {/* ────────── RIGHT: Sidebar ────────── */}
                    <aside data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" className="w-full lg:w-[320px] xl:w-[360px] shrink-0">

                        {/* Latest Blog Posts */}
                        <div className="border border-gray-200 p-6">

                            {/* Sidebar Heading */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1 h-6 bg-[#1d8f2c]" />
                                <h3 className="text-lg font-bold text-[#232434]">Latest Posts</h3>
                            </div>

                            <div className="space-y-5">
                                {recentBlogs.map((item, idx) => (
                                    <Link
                                        key={item._id || idx}
                                        href={`/blogs/${item.slug}`}
                                        className="flex gap-4 group"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-[88px] h-[72px] shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="flex flex-col justify-center">
                                            <span className="text-xs text-[#1d8f2c] font-semibold mb-1">
                                                {item.date}
                                            </span>
                                            <p className="text-sm font-medium text-[#232434] leading-snug group-hover:text-[#1d8f2c] transition-colors line-clamp-2">
                                                {item.title}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* View All */}
                            <Link
                                href="/blogs"
                                className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1d8f2c] hover:underline"
                            >
                                View All Posts
                                <ArrowRight size={15} />
                            </Link>
                        </div>

                        {/* CTA Banner */}
                        <div className="mt-6 relative overflow-hidden bg-[#0E171A] p-8 text-white">
                            {/* Decorative circle */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1d8f2c]/20" />
                            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#1d8f2c]/10" />

                            <p className="relative text-xs uppercase tracking-widest text-[#1d8f2c] font-semibold mb-2">
                                Get a Quote
                            </p>
                            <h4 className="relative text-xl font-bold leading-snug mb-3">
                                Ready to Switch to Solar Energy?
                            </h4>
                            <p className="relative text-sm text-white/70 leading-relaxed mb-5">
                                Contact us today and our experts will design the perfect solar solution for your home or business.
                            </p>
                            <Link
                                href="/contactus"
                                className="relative inline-flex items-center gap-2 bg-[#1d8f2c] text-white px-5 py-3 text-sm font-semibold hover:bg-green-700 transition-colors"
                            >
                                Contact Us
                                <ChevronRight size={16} />
                            </Link>
                        </div>

                    </aside>

                </div>
            </div>
        </section>
    );
};

export default BlogDetailContent;
