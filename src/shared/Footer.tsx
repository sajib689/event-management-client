"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & App Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="EventPlace" width={40} height={40} />
            <span className="font-bold text-xl">EventPlace</span>
          </div>
          <p className="text-sm mb-4">
            Whether you want to host a single or multi-events, EventPlace is your best choice for you.
          </p>
          <p className="font-semibold mb-2">DOWNLOAD APP:</p>
          <div className="flex gap-2">
            <Image src="/app_store.png" alt="App Store" width={120} height={40} />
            <Image src="/google_play.png" alt="Google Play" width={120} height={40} />
          </div>
        </div>

        {/* Social & Subscribe */}
        <div>
          <p className="font-semibold mb-4">FOLLOW US:</p>
          <div className="flex gap-4 mb-6 text-lg">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaLinkedinIn className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
          </div>
          <p className="font-semibold mb-2">SUBSCRIBE</p>
          <div className="flex border border-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 text-white w-full outline-none"
            />
            <button className="bg-white text-purple-700 px-4 font-bold">
              ➤
            </button>
          </div>
        </div>

        {/* Events Info */}
        <div>
          <p className="font-semibold mb-4">Events Info</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">All Events</a></li>
            <li><a href="#" className="hover:underline">Featured Events</a></li>
            <li><a href="#" className="hover:underline">Up Coming Events</a></li>
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <p className="font-semibold mb-4">Useful Link</p>
          <ul className="space-y-2 text-sm mb-6">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Team</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>

          <p className="font-semibold mb-2">Looking For Help</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-purple-600" />
      <div className="text-center text-sm text-white">
        © 2025, EventPlace. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
