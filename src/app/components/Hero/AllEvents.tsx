/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetEventsQuery, useJoinEventMutation } from "@/redux/api/event/eventApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface IEvent {
  _id?: string;
  title: string;
  postedBy: string;
  dateTime: string;
  location: string;
  description: string;
  attendeeCount: number;
  joinedUsers: string[];
}

const dateFilterOptions = [
  { value: "", label: "All" },
  { value: "today", label: "Today" },
  { value: "currentWeek", label: "This Week" },
  { value: "lastWeek", label: "Last Week" },
  { value: "currentMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom Range" },
];

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const AllEvents = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<
    | ""
    | "today"
    | "currentWeek"
    | "lastWeek"
    | "currentMonth"
    | "lastMonth"
    | "custom"
  >("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    const [joinEvent, { isLoading: joining }] = useJoinEventMutation();

  const filters = {
    search: search.trim() || undefined,
    dateFilter: dateFilter || undefined,
    startDate: dateFilter === "custom" && startDate ? startDate : undefined,
    endDate: dateFilter === "custom" && endDate ? endDate : undefined,
  };

  const { data: events, error, isLoading, isFetching } = useGetEventsQuery(filters);

  // Example join handler — replace with real logic

const handleJoin = async (eventId?: string) => {
  if (!eventId) return;
  try {
    const userId = "USER_ID_HERE"; // Replace with actual logged-in user ID
    await joinEvent({ eventId, userId }).unwrap();
    toast.success("Successfully joined the event!");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to join event.");
  }
};
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">All Events</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-2" htmlFor="search">
            Search by Title
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2" htmlFor="dateFilter">
            Date Filter
          </label>
          <select
            id="dateFilter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {dateFilterOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {dateFilter === "custom" && (
          <>
            <div>
              <label className="block font-semibold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </>
        )}
      </div>

      {/* Loading/Error/Empty */}
      {isLoading || isFetching ? (
       <Loader2/>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">Failed to load events.</p>
      ) : !events || events.length === 0 ? (
        <p className="text-center text-lg">No events found.</p>
      ) : (
        // Events grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {(events as IEvent[]).map((event) => (
    <div
      key={event._id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image and Content wrapped in a single parent */}
      <div className="relative w-full h-48">
        <Image
          src={DEFAULT_IMAGE_URL}
          alt={event.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-1">
          <strong>Posted By:</strong> {event.postedBy}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Date &amp; Time:</strong>{" "}
          {new Date(event.dateTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-700 mb-4 flex-grow">{event.description}</p>
        <p className="font-semibold text-purple-700 mb-4">
          Attendees: {event.attendeeCount}
        </p>
        {/* Join Now Button */}
        <button
          onClick={() => handleJoin(event._id)}
          disabled={joining}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {joining ? "Joining..." : "Join Now"}
        </button>
      </div>
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default AllEvents;
