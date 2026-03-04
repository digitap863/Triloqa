import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative w-full h-[80vh] overflow-hidden font-sans">

            {/* Background Image */}
            <Image
                src="/images/about/b.jpg"
                alt="About background"
                fill
                className="object-cover"
                priority
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0E171A] via-#74AD1B]/90 to-[#74AD1B]/90" />



            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 mt-20">
                <h1 className="text-white text-5xl md:text-6xl font-bold">
                    Blogs
                </h1>

                <div className="mt-4 flex items-center gap-2 text-white/90 text-sm">
                    <Link href="/" className="hover:underline">
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