import Image from "next/image";

const TestimonialSection = () => {
  return (
    <section className="w-full h-screen bg-white py-24 relative font-sans">
        <div className="h-[50%] w-full absolute bottom-0 bg-[#282832] z-0"></div>
      <div className="max-w-7xl mx-auto px-6 mt-10 relative z-10">
        <div className="bg-[#f3f7fb] shadow-sm p-16 flex  gap-16 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative h-[360px] w-[314px]  overflow-hidden">
              <Image
                src="/images/home/t1.jpg"
                alt="Client"
                fill
                className="object-cover"
              />
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="uppercase text-[#1d8f2c] font-semibold tracking-wide">
              Testimonials
            </p>

            <h2 className="text-[40px] font-bold text-[#232434] mt-2">
              What’s Clients Say
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4">
              Nullam dignissim, ante scelerisque the is euismod fermentum odio
              sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean
              a imperdiet risus. Aliquam pellentesque nisi dui eget dapibus
              enim ornare eu. Morbi nunc metus, maximus eu mauris.
            </p>

            <div className="w-full h-px bg-blue-200 my-4" />

            <p className="font-semibold text-gray-900">
              Kathryn Murphy
            </p>
            <p className="text-gray-500 text-sm">
              Web Designer
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;