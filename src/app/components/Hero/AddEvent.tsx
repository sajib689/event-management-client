/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useCreateEventMutation } from "@/redux/api/event/eventApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const AddEvent = () => {
    const user = useSelector((state: RootState) => state.auth.user);

useEffect(() => {
  if (user?.name) {
    setFormData((prev) => ({
      ...prev,
      postedBy: user.name,
    }));
  }
}, [user?.name]);

  const [formData, setFormData] = useState({
    title: "",
    postedBy: "",
    dateTime: "",
    location: "",
    description: "",
    attendeeCount: 0,
  });

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendeeCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add joinedUsers as empty array for new event
      await createEvent({ ...formData, joinedUsers: [] }).unwrap();
      toast.success("Event added successfully!");
      setFormData({
        title: "",
        postedBy: "",
        dateTime: "",
        location: "",
        description: "",
        attendeeCount: 0,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4D3CA6] to-[#9E499C] p-6 flex justify-center items-center mt-20">
      <div className="w-full max-w-xl text-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="hidden">
            <label className="block text-sm font-medium text-white">Your Name</label>
            <input
              type="text"
              name="postedBy"
              value={formData.postedBy}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Attendee Count</label>
            <input
              type="number"
              name="attendeeCount"
              value={formData.attendeeCount}
              onChange={handleChange}
              min={0}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
