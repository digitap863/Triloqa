import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden font-sans">

            {/* Background Image */}
            <Image
                src="/images/about/b.jpg"
                alt="About background"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0E171A] via-#74AD1B]/90 to-[#74AD1B]/90" />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
                <h1 data-aos="fade-up" data-aos-duration="1000" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Blogs
                </h1>

                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="mt-3 sm:mt-4 flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <Link href="/" className="hover:underline transition-opacity hover:opacity-80">
                        Home
                    </Link>
                    <span>›</span>
                    <span className="font-medium">Blogs</span>
                </div>
            </div>
        </section>
    );
}

export default Banner;