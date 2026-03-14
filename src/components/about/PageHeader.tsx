import Image from "next/image";
import Link from "next/link";

const PageHeader = () => {
    return (
        <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] overflow-hidden font-sans">

            {/* Background Image */}
            <Image
                src="/images/about/b.jpg"
                alt="About background"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0E171A] via-#74AD1B]/90 to-[#74AD1B]/90" />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 mt-14 sm:mt-16 lg:mt-20">
                <h1 data-aos="fade-up" data-aos-duration="1000" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    About Us
                </h1>

                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="mt-3 lg:mt-4 flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <span>›</span>
                    <span className="font-medium">About Us</span>
                </div>
            </div>
        </section>
    );
};

export default PageHeader;