/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMyEventsQuery, useDeleteEventMutation, useUpdateEventMutation } from "@/redux/api/event/eventApi";
import { RootState } from "@/redux/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Pencil, Trash2, Save, XCircle } from "lucide-react";

const MyEvent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: myEvents, isLoading, refetch } = useGetMyEventsQuery({ postedBy: user?.name });

  const [deleteEvent] = useDeleteEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    datetime: "",
    location: "",
    description: "",
  });

  const handleEdit = (event: any) => {
    setEditingId(event._id);
    setFormData({
      title: event.title,
      datetime: event.datetime,
      location: event.location,
      description: event.description,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateEvent({ id: editingId, payload: formData }).unwrap();
      toast.success("Event updated successfully!");
      setEditingId(null);
      refetch();
    } catch {
      toast.error("Failed to update event.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id).unwrap();
        toast.success("Event deleted.");
        refetch();
      } catch {
        toast.error("Failed to delete event.");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading your events...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-purple-700">My Events</h2>

      {myEvents?.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No events found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event: any) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300 flex flex-col"
            >
              {editingId === event._id ? (
                <>
                  <input
                    className="border px-3 py-2 rounded mb-2 focus:outline-purple-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event Title"
                  />
                  <input
                    type="datetime-local"
                    className="border px-3 py-2 rounded mb-2 focus:outline-purple-500"
                    value={formData.datetime}
                    onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                  />
                  <input
                    className="border px-3 py-2 rounded mb-2 focus:outline-purple-500"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Location"
                  />
                  <textarea
                    className="border px-3 py-2 rounded mb-4 focus:outline-purple-500"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description"
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center gap-1 bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 bg-gray-500 text-white px-4 py-1.5 rounded hover:bg-gray-600 transition"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date & Time:</strong> {new Date(event.datetime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Description:</strong> {event.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Attendees:</strong> {event.attendeeCount}
                  </p>

                  <div className="flex justify-end gap-3 mt-auto">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvent;
