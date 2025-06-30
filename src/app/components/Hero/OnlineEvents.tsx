"use client";

import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

const onlineEvents = [
  {
    id: 1,
    title: "Entomology International Congress of Vancouver",
    date: "Fri, 05 Sep 2025",
    organizer: "Set Your Vendor",
    image: "/e1.jpg",
  },
  {
    id: 2,
    title: "Success Free Career & Meditation Classes",
    date: "Thu, 06 Nov 2025",
    organizer: "Set Your Vendor",
    image: "/e2.jpg",
  },
  {
    id: 3,
    title: "Career Fair: Exclusive Hiring Event–New",
    date: "Thu, 10 Oct 2024",
    organizer: "Set Your Vendor",
    image: "/e3.jpg",
  },
  {
    id: 4,
    title: "Symposiums Chemotherapy Foundation Symposiums",
    date: "Thu, 04 Dec 2025",
    organizer: "Set Your Vendor",
    image: "/e4.jpg",
  },
];

const OnlineEvents = () => {
  return (
    <section className="bg-gradient-to-br from-[#f5f4fa] to-[#fef6fc] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-pink-600 font-semibold text-xl">Online Event</h3>
          <h2 className="text-4xl font-bold text-gray-800">Join online Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {onlineEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg flex overflow-hidden"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={180}
                height={160}
                className="w-40 h-40 object-cover rounded-l-xl"
              />
              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-gray-400" /> {event.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    Organized By <span className="text-pink-600 font-medium">{event.organizer}</span>
                  </p>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 border-2 border-[#8A1C99] cursor-pointer font-semibold rounded-md hover:bg-[#8A1C99] text-[#8A1C99] hover:text-white transition duration-300">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineEvents;
