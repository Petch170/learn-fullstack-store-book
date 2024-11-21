import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",

  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    fechAllBooks: builder.query({
      query: () => "/",
      providersTag: ["Books"],
    }),
    fechOneBook: builder.query({
      query: (id) => `/onebook/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"], //ทำให้ cache ของ `Books` หมดอายุ (refresh browser)
    }),
    updateABook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: "/edit/" + id,
        method: "PUT",
        body: rest,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/del/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFechAllBooksQuery,
  useFechOneBookQuery,
  useAddBookMutation,
  useUpdateABookMutation,
  useDeleteBookMutation,
} = bookApi;
export default bookApi;
