/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const speakers = [
  {
    name: "Vick Robel",
    title: "Chief Disrupter at Un",
    img: "/i1.jpg",
    overlay: "bg-pink-600/70",
  },
  {
    name: "Steven Addls",
    title: "CEO at addis",
    img: "/i2.jpg",
    overlay: "bg-black/70",
  },
  {
    name: "Sandra Aamodt",
    title: "CEO at addis",
    img: "/i3.jpg",
    overlay: "bg-cyan-500/70",
  },
  {
    name: "Mosh Hamedani",
    title: "Software Engineer",
    img: "/i4.jpg",
    overlay: "bg-gray-700/70",
  },
  {
    name: "Mike Addls",
    title: "CEO at Amazon",
    img: "/i5.jpg",
    overlay: "bg-red-400/70",
  },
  {
    name: "Marc Abrahams",
    title: "Editor at Improbable",
    img: "/i6.jpg",
    overlay: "bg-green-500/70",
  },
  {
    name: "Leyla Acaroglu",
    title: "CEO at addis",
    img: "/i7.jpg",
    overlay: "bg-yellow-400/70",
  },
  {
    name: "John Duo",
    title: "Producer",
    img: "/i8.jpg",
    overlay: "bg-orange-400/70",
  },
];

const SpeakerCard = ({ speaker }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 transition hover:shadow-lg">
      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
        <Image src={speaker.img} alt={speaker.name} fill className="object-cover" />
        <div className={`absolute inset-0 ${speaker.overlay}`} />
      </div>
      <h4 className="font-bold text-lg">{speaker.name}</h4>
      <p className="text-gray-500 text-sm">{speaker.title}</p>
      <div className="flex justify-center gap-4 text-indigo-600 text-lg mt-2">
        <FaFacebookF />
        <FaTwitter />
        <FaLinkedinIn />
        <FaInstagram />
      </div>
    </div>
  );
};

const PopularSpeakers = () => {
  return (
    <section className="py-16 bg-[#f6f7fb]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-pink-600 font-semibold text-lg mb-2">Speaker</p>
        <h2 className="text-3xl font-bold mb-10">Popular Speakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpeakers;
