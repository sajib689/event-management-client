import { baseApi } from "@/redux/base/baseApi";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: "/events",
        method: "POST",
        body: eventData,
      }),
    }),

    getEvents: builder.query({
      query: (filters?: {
        search?: string;
        dateFilter?:
          | "today"
          | "currentWeek"
          | "lastWeek"
          | "currentMonth"
          | "lastMonth"
          | "custom";
        startDate?: string;
        endDate?: string;
      }) => {
        const params = new URLSearchParams();

        if (filters?.search) params.append("search", filters.search);
        if (filters?.dateFilter) params.append("dateFilter", filters.dateFilter);
        if (filters?.startDate) params.append("startDate", filters.startDate);
        if (filters?.endDate) params.append("endDate", filters.endDate);

        return `/events?${params.toString()}`;
      },
    }),

   getMyEvents: builder.query({
  query: ({ postedBy }) => `/my-events?postedBy=${postedBy}`,
}),


    updateEvent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),

    joinEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `/events/join/${eventId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetMyEventsQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useJoinEventMutation,
} = eventApi;
