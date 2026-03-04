import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    date: "Feb, 2025",
    title: "Harnessing The Sun The Future Of The Solar Power.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
  },
  {
    date: "May, 2025",
    title: "How To Choose The Right Solar Panels For Your Home.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
  },
  {
    date: "July, 2025",
    title: "DIY Solar Can You Really Install Solar Panels Yourself.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
  },
];

const LatestBlog = () => {
  return (
    <section className="w-full min-h-screen flex items-center bg-white font-sans py-16 lg:py-0 lg:h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

        <p className="text-[#1d8f2c] text-center mb-3 uppercase font-semibold tracking-wide text-sm sm:text-base">
          Recent Articles
        </p>

        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2330] mb-8 lg:mb-10">
          Our Latest Blog
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 sm:p-5 lg:p-6"
            >
              {/* Image */}
              <div className="relative h-[200px] sm:h-[210px] lg:h-[220px]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                {/* Date badge */}
                <span className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-white px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base font-semibold text-[#232434]">
                  {blog.date}
                </span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-[#232434] leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-2 lg:mt-3 text-[#585858] text-sm lg:text-base leading-relaxed">
                  {blog.desc}
                </p>

                <Link
                  href="#"
                  className="inline-block mt-3 lg:mt-4 text-[#1d8f2c] font-medium hover:underline text-sm lg:text-base"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;