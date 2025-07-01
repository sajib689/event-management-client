"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-20 lg:px-32 py-16 text-left">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Discover & Promote <br className="hidden sm:block" /> Upcoming Event
        </h1>

        <p className="text-[#D1F9FF] text-base sm:text-lg mt-4 max-w-xl">
          Join exciting conferences, workshops, and meetups in your area. Promote your own event to a global audience.
        </p>

        <button className="mt-8 bg-[#8A1C99] text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#8A1C99] border border-white transition duration-300">
          <Link href="/login">Book Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
