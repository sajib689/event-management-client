"use client";

import Image from "next/image";
import Link from "next/link";
type Event = {
  id: number;
  title: string;
  date: string;
  organizer: string;
  image: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Entomology International Congress of Vancouver",
    date: "Fri, 05 Sep 2025",
    organizer: "Set your vendor",
    image: "/1.jpg",
  },
  {
    id: 2,
    title: "Global Climate Change Conference",
    date: "Mon, 15 Sep 2025",
    organizer: "Earth First Org",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Digital Innovation Summit 2025",
    date: "Wed, 17 Sep 2025",
    organizer: "Tech World Expo",
    image: "/3.jpg",
  },
  {
    id: 4,
    title: "Healthcare Leadership Forum",
    date: "Tue, 23 Sep 2025",
    organizer: "MediTrust Group",
    image: "/4.jpg",
  },
  {
    id: 5,
    title: "International Architecture Meetup",
    date: "Thu, 25 Sep 2025",
    organizer: "Design Masters",
    image: "/5.jpg",
  },
  {
    id: 6,
    title: "Global Marketing Leaders Conference",
    date: "Sat, 27 Sep 2025",
    organizer: "BrightMark Agency",
    image: "/6.jpg",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + Subtitle */}
        <div className="text-center mb-12">
            
          <h2 className="text-4xl font-extrabold text-gray-900">
            Upcoming Events
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Discover top conferences and summits happening soon.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
                priority={event.id === 1}
              />
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{event.date}</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Organized By:{" "}
                  <span className="font-medium">{event.organizer}</span>
                </p>
                <div className="mt-auto">
                  <button className="hover:bg-[#8A1C99] text-[#8A1C99] px-4 py-2 rounded-md bg-[var(--hover-background)] hover:text-white transition duration-300 border border-[#8A1C99]">
                    <Link href="/login">Pre Book Now</Link>
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

export default UpcomingEvents;
