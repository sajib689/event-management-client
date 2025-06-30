"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[80px] px-6 fixed top-0 left-0 z-50 transition-all duration-300 flex items-center justify-between ${
        scrolled
          ? "bg-gradient-to-r from-[#9E499C] to-[#4D3CA6] shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div>
        <Image src="/logo.png" width={150} height={120} alt="logo" />
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-6 ml-10 justify-center text-white font-extrabold">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/event">Event</Link>
        </li>
        <li>
          <Link href="/my-event">My Event</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex items-center">
        <button className="bg-[var(--button-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--hover-background)] hover:text-[var(--button-color)] transition duration-300 border border-white">
          <Link href="/auth/login">Login</Link>
        </button>
        <button className="bg-[var(--button-color)] ms-3 text-white px-4 py-2 rounded-md hover:bg-[var(--hover-background)] hover:text-[var(--button-color)] transition duration-300 border border-white">
          <Link href="/auth/register">Sign Up</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
