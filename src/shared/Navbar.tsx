"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react"; // Optional: lucide icons
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store"; // Adjust path as needed
import { logout } from "@/redux/auth/userSlice"; // Adjust path as needed

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // Select logged-in user from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gradient-to-br from-[#4D3CA6] to-[#9E499C] ${
        scrolled
          ? "bg-gradient-to-r from-[#9E499C] to-[#4D3CA6] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <div>
          <Image src="/logo.png" width={130} height={80} alt="logo" priority />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white font-bold">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-event" className="hover:underline">
              Events
            </Link>
          
          </li>
          <li>
            <Link href="/add-event" className="hover:underline">
            Add  Event
            </Link>
          </li>
          <li>
            <Link href="/my-event" className="hover:underline">
              My Event
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons/User Profile */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link href="/auth/login">
                <button className="bg-[var(--button-color)] text-white px-4 py-2 rounded hover:bg-[var(--hover-background)] hover:text-[var(--button-color)] transition border border-white">
                  Login
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="bg-[var(--button-color)] text-white px-4 py-2 rounded hover:bg-[var(--hover-background)] hover:text-[var(--button-color)] transition border border-white">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div
              className="relative cursor-pointer"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {/* Profile image */}
              <Image
                src={user?.img || "/default-profile.png"}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />

              {/* Dropdown on hover */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg text-gray-800 p-3 flex flex-col items-center z-50">
                  <p className="font-semibold mb-2 truncate">{user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#9E499C] text-white py-1 rounded hover:bg-[#4D3CA6] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden bg-transparent transition duration-300 px-4 pb-4 text-white">
          <ul className="flex flex-col gap-4 font-semibold">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/event" onClick={() => setMenuOpen(false)}>
                Event
              </Link>
            </li>
            <li>
              <Link href="/my-event" onClick={() => setMenuOpen(false)}>
                My Event
              </Link>
            </li>
          </ul>
          {!user ? (
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-white text-[#4D3CA6] font-bold py-2 rounded border">
                  Login
                </button>
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-white text-[#9E499C] font-bold py-2 rounded border">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3 border-t border-white pt-3">
              <div className="flex items-center gap-3">
                <Image
                  src={user.img || "/default-profile.png"}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <p className="font-semibold">{user.name}</p>
              </div>
              <button
                onClick={() => {
                  dispatch(logout());
                  setMenuOpen(false);
                }}
                className="w-full bg-[#9E499C] text-white py-2 rounded font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
