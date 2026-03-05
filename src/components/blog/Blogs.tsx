import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    date: "Feb, 2025",
    title: "Harnessing The Sun The Future Of The Solar Power.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "harnessing-the-sun-future-solar-power",
  },
  {
    date: "May, 2025",
    title: "How To Choose The Right Solar Panels For Your Home.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "choose-right-solar-panels",
  },
  {
    date: "July, 2025",
    title: "DIY Solar Can You Really Install Solar Panels Yourself.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "diy-solar-installation",
  },
  {
    date: "Feb, 2025",
    title: "Harnessing The Sun The Future Of The Solar Power.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "harnessing-the-sun-future-solar-power",
  },
  {
    date: "May, 2025",
    title: "How To Choose The Right Solar Panels For Your Home.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "choose-right-solar-panels",
  },
  {
    date: "July, 2025",
    title: "DIY Solar Can You Really Install Solar Panels Yourself.",
    desc: "Nulla ut turpis a nisi vulputate varius non ut lectus. Ut vulputate tempus tincidunt. Duis mi tellus,",
    image: "/images/home/b1.jpg",
    slug: "diy-solar-installation",
  },
];

const Blogs = () => {
  return (
    <section className="w-full min-h-screen py-12 sm:py-16 lg:py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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
              <div className="mt-3 lg:mt-4">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-[#232434] leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-2 lg:mt-3 text-[#585858] text-sm lg:text-base leading-relaxed">
                  {blog.desc}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-block mt-3 lg:mt-4 text-[#1d8f2c] text-sm lg:text-base font-medium hover:underline"
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

export default Blogs;