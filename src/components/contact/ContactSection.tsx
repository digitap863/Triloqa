"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/user/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Failed to connect to the server. Please check your internet.");
    }
  };

  return (
    <section className="w-full bg-[#f4f4f4] py-20 font-sans text-[#232434]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col order-2 md:order-1">

          {/* GREEN CONTACT CARD */}
          <div className="bg-[#1D8F2C] text-white p-10 space-y-8">

            {/* CALL */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <Phone />
              </div>
              <div>
                <p className="text-sm opacity-80 font-medium">Call Us</p>
                <p className="text-xl font-bold">+91 92078 56999</p>
              </div>
            </div>

            <div className="border-t border-white/20" />

            {/* EMAIL */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <Mail />
              </div>
              <div>
                <p className="text-sm opacity-80 font-medium">Mail Us</p>
                <p className="text-xl font-bold">triloqasales@gmail.com</p>
              </div>
            </div>

            <div className="border-t border-white/20" />

            {/* LOCATION */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white flex items-center justify-center shrink-0">
                <MapPin />
              </div>
              <div>
                <p className="text-sm opacity-80 font-medium">Location</p>
                <p className="text-sm font-semibold leading-relaxed">Second Floor, Statue Junction, Lotus City Centre, FACT Nagar, Thrippunithura, Kochi, Ernakulam, Kerala 682301</p>
              </div>
            </div>

          </div>

          {/* IMAGE */}
          <div data-aos="zoom-in" data-aos-delay="400" className="relative h-[320px] w-full">
            <Image
              src="/images/c.jpg"
              alt="Support"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="order-1 md:order-2">
          <h2 data-aos="fade-up" className="text-4xl font-bold text-[#232434]">
            We&apos;d Love To Hear From You!
          </h2>

          <p data-aos="fade-up" data-aos-delay="100" className="text-[#585858] mt-4 mb-10 leading-relaxed max-w-lg">
            Whether you have a question about solar installations or need a maintenance quote, our team is ready to assist you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-aos="fade-up" data-aos-delay="200">
                <label className="block mb-2 font-semibold text-[#232434]">
                  Your Name*
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D8F2C] transition-all bg-white"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300">
                <label className="block mb-2 font-semibold text-[#232434]">
                  Your Email*
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D8F2C] transition-all bg-white"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div data-aos="fade-up" data-aos-delay="400">
              <label className="block mb-2 font-semibold text-[#232434]">
                Write Message*
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Message"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D8F2C] transition-all bg-white"
              />
            </div>

            {/* BUTTON */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={status === "loading"}
                data-aos="fade-up"
                data-aos-delay="500"
                className="bg-[#1D8F2C] text-white px-8 py-4 font-bold flex items-center gap-3 hover:bg-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-green-900/10"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Message */}
              {statusMessage && (
                <div
                  data-aos="fade-in"
                  className={`text-sm font-medium px-4 py-2 rounded-md border ${status === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                  {statusMessage}
                </div>
              )}
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;