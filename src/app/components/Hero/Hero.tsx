import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[100vh]"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center", // Subtract navbar height
      }}
    >
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-start justify-center h-full ms-20">
        {/* <h3 className="text-[#6DFFFF] text-2xl italic">
          Find Your Next Experience
        </h3> */}
        <h1 className="text-white text-7xl font-bold mt-2">
          Discover & Promote <br /> Upcoming Event
        </h1>
        <button className="bg-[#8A1C99] mt-10 text-white px-4 py-2 rounded-md hover:bg-[var(--hover-background)] hover:text-[var(--button-color)] transition duration-300 border border-white">
          <Link href="/login">Book Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
