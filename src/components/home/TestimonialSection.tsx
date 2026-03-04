import Image from "next/image";

const TestimonialSection = () => {
  return (
    <section className="w-full min-h-screen bg-white py-16 sm:py-20 lg:py-24 relative font-sans flex items-center">
      <div className="h-[50%] w-full absolute bottom-0 bg-[#282832] z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10 relative z-10">
        <div className="bg-[#f3f7fb] shadow-sm p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
 
          {/* LEFT IMAGE */}
          <div className="relative shrink-0">
            <div className="relative h-[240px] w-[210px] sm:h-[300px] sm:w-[260px] lg:h-[360px] lg:w-[314px] overflow-hidden">
              <Image
                src="/images/home/t1.jpg"
                alt="Client"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full">
            <p className="uppercase text-[#1d8f2c] font-semibold tracking-wide text-sm sm:text-base">
              Testimonials
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#232434] mt-2 leading-tight">
              What&apos;s Clients Say
            </h2>

            <p className="text-gray-600 leading-relaxed mt-3 lg:mt-4 text-sm sm:text-base">
              Nullam dignissim, ante scelerisque the is euismod fermentum odio
              sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean
              a imperdiet risus. Aliquam pellentesque nisi dui eget dapibus
              enim ornare eu. Morbi nunc metus, maximus eu mauris.
            </p>

            <div className="w-full h-px bg-blue-200 my-4" />

            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              Kathryn Murphy
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Web Designer
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;