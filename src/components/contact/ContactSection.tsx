"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

const ContactSection = () => {
  return (
    <section className="w-full bg-[#f4f4f4] py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col">

          {/* GREEN CONTACT CARD */}
          <div className="bg-[#1D8F2C] text-white p-10 space-y-8">

            {/* CALL */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <Phone />
              </div>
              <div>
                <p className="text-sm opacity-80">Call Us 7/24</p>
                <p className="text-xl font-semibold">+208-555-0112</p>
              </div>
            </div>

            <div className="border-t border-white/30" />

            {/* EMAIL */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <Mail />
              </div>
              <div>
                <p className="text-sm opacity-80">Make a Quote</p>
                <p className="text-xl font-semibold">Solar@Gmail.Com</p>
              </div>
            </div>

            <div className="border-t border-white/30" />

            {/* LOCATION */}
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <MapPin />
              </div>
              <div>
                <p className="text-sm opacity-80">Location</p>
                <p className="text-xl font-semibold">4517 Washington Ave.</p>
              </div>
            </div>

          </div>

          {/* IMAGE WITH PLAY BUTTON */}
          <div className="relative h-[320px] w-full">
            <Image
              src="/images/c.jpg"
              alt="Support"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            We&apos;d Love To Hear From!
          </h2>

          <p className="text-gray-600 mt-4 mb-10 leading-relaxed">
            Nullam varius, erat quis iaculis dictum, eros urna varius eros,
            ut blandit felis odio in turpis. Quisque rhoncus, eros in auctor
            ultrices,
          </p>

          <form className="space-y-6">

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Your Name*
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Your Email*
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block mb-2 font-medium">
                Write Message*
              </label>
              <textarea
                rows={6}
                placeholder="Write Message"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-[#1D8F2C] text-white px-8 py-4 font-semibold flex items-center gap-3 hover:bg-green-800 transition"
            >
              Send message
              <ArrowRight size={18} />
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;