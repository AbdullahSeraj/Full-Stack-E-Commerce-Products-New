import { apiSlice } from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),

    getOneUser: builder.query({
      query: (id) => ({
        url: `/users/get-one-user/${id}`,
      }),
      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => ({
        url: "/users/get-user",
      }),
      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),

    updateRole: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/users/update-role/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateRoleMutation,
  useGetOneUserQuery,
} = userApiSlice;
