import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#282832] text-white relative font-sans">

            {/* TOP CONTACT STRIP */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* CALL */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center">
                            <Phone className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70">Call Us</p>
                            <p className="text-xl font-semibold">+91 92078 56999</p>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center gap-5 md:border-x md:border-white/10 md:px-10">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center">
                            <Mail className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70">Make a Quote</p>
                            <p className="text-xl font-semibold">Solar@Gmail.Com</p>
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center">
                            <MapPin className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-white/70">Location</p>
                            <p className="text-sm font-semibold">Second Floor, Statue Junction, Lotus City Centre, FACT Nagar, Thrippunithura, Kochi, Ernakulam, Kerala 682301</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">

                {/* BRAND */}
                <div>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo1.png"
                            width={150}
                            height={50}
                            alt="logo"
                        />
                    </div>

                    <p className="text-white/70 mt-2 leading-relaxed">
                        Brighten Your home Lighten your bill
                    </p>

                    <div className="flex gap-4 mt-6">
                        {["f", "t", "in", "yt"].map((i, idx) => (
                            <div
                                key={idx}
                                className="w-10 h-10 border border-white/20 flex items-center justify-center rounded"
                            >
                                {i}
                            </div>
                        ))}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="text-xl font-semibold mb-6 border-b border-white/20 pb-2 inline-block">
                        Quick Links
                    </h4>

                    <ul className="space-y-4 text-white/80">
                        {[
                            "About",
                            "Services",
                            "Blogs",
                            "Contact Us",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <ChevronRight size={16} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SERVICES */}
                <div>
                    <h4 className="text-xl font-semibold mb-6 border-b border-white/20 pb-2 inline-block">
                        Services
                    </h4>

                    <ul className="space-y-4 text-white/80">
                        {[
                            "Consultancy",
                            "Solar System",
                            "Solar Panel",
                            "Style Guide",
                            "License",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <ChevronRight size={16} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RECENT POSTS */}
                <div>
                    <h4 className="text-xl font-semibold mb-6 border-b border-white/20 pb-2 inline-block">
                        Recent Blogs
                    </h4>

                    <div className="space-y-6">

                        {[1, 2].map((_, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-20 h-20 shrink-0 relative overflow-hidden">
                                    <Image
                                        src="/images/home/b1.jpg"
                                        alt="post"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-white/60">
                                        {idx === 0 ? "20 Feb, 2025" : "15 Dec, 2025"}
                                    </p>
                                    <p className="font-semibold leading-snug mt-1">
                                        2021 Batterman Award HonorsBrad Burkhart
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;