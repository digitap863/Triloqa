import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User, Tag, ArrowRight, ChevronRight } from "lucide-react";

// ──────────────────────────────────────────────
// Dummy data
// ──────────────────────────────────────────────
const blog = {
    title: "Harnessing The Sun: The Future Of Solar Power In Modern Homes",
    date: "February 15, 2025",
    author: "Triloqa Team",
    category: "Solar Energy",
    image: "/images/home/b1.jpg",
    content: [
        {
            heading: "Introduction",
            body: `Solar power has rapidly evolved from a niche technology to a mainstream solution for household energy needs. With rising electricity costs and growing environmental awareness, more homeowners are making the switch to solar energy systems. The technology has become more efficient, affordable, and accessible than ever before.`,
        },
        {
            heading: "Why Solar Power?",
            body: `The sun provides an abundant and renewable source of energy that can power entire homes without producing harmful emissions. Modern solar panels can convert sunlight into electricity with efficiency rates exceeding 22%, and with battery storage solutions, homeowners can even power their homes through the night or on cloudy days.`,
        },
        {
            heading: "Benefits of Going Solar",
            body: `Installing solar panels offers numerous advantages — reduced electricity bills, increased property value, energy independence, and a significant reduction in your carbon footprint. Government subsidies and favorable net-metering policies have made the return on investment more attractive, with most systems paying for themselves within 5 to 7 years.`,
        },
        {
            heading: "What to Expect During Installation",
            body: `A typical residential solar installation takes 1 to 3 days depending on system size. After an initial site assessment, our certified engineers design a customized system layout. Panels are mounted on your roof, wiring is connected to your inverter and electrical panel, and the system is commissioned and tested before handover.`,
        },
        {
            heading: "The Future is Bright",
            body: `As battery storage technology matures and solar panel costs continue to fall, the adoption of solar power will only accelerate. Smart home integration, EV charging, and community solar programs are all converging to make solar energy the cornerstone of a cleaner, more resilient energy grid. The future of energy is solar — and it starts at your rooftop.`,
        },
    ],
    tags: ["Solar", "Renewable Energy", "Green Living", "Home Improvement"],
};

const latestBlogs = [
    {
        date: "May, 2025",
        title: "How To Choose The Right Solar Panels For Your Home.",
        image: "/images/home/b1.jpg",
        slug: "choose-right-solar-panels",
    },
    {
        date: "July, 2025",
        title: "DIY Solar: Can You Really Install Solar Panels Yourself?",
        image: "/images/home/b1.jpg",
        slug: "diy-solar-installation",
    },
    {
        date: "Aug, 2025",
        title: "Understanding Net Metering And How It Saves You Money.",
        image: "/images/home/b1.jpg",
        slug: "net-metering-guide",
    },
    {
        date: "Sep, 2025",
        title: "Top 5 Battery Storage Solutions For Solar Homes.",
        image: "/images/home/b1.jpg",
        slug: "top-battery-storage-solutions",
    },
];

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
const BlogDetailContent = () => {
    return (
        <section className="w-full bg-white py-14 lg:py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                    {/* ────────── LEFT: Main Blog Content ────────── */}
                    <article className="flex-1 min-w-0">

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
                            <span className="flex items-center gap-1.5">
                                <Tag size={15} className="text-[#1d8f2c]" />
                                {blog.category}
                            </span>
                        </div>

                        {/* Blog Heading */}
                        <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#232434] leading-snug">
                            {blog.title}
                        </h2>

                        {/* Divider */}
                        <div className="mt-5 mb-7 w-16 h-1 bg-[#1d8f2c]" />

                        {/* Blog Body */}
                        <div className="space-y-8 text-[#585858] text-sm sm:text-base leading-relaxed">
                            {blog.content.map((section, idx) => (
                                <div key={idx}>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#232434] mb-2">
                                        {section.heading}
                                    </h3>
                                    <p>{section.body}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
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
                    </article>

                    {/* ────────── RIGHT: Sidebar ────────── */}
                    <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0">

                        {/* Latest Blog Posts */}
                        <div className="border border-gray-200 p-6">

                            {/* Sidebar Heading */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1 h-6 bg-[#1d8f2c]" />
                                <h3 className="text-lg font-bold text-[#232434]">Latest Posts</h3>
                            </div>

                            <div className="space-y-5">
                                {latestBlogs.map((item, idx) => (
                                    <Link
                                        key={idx}
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
