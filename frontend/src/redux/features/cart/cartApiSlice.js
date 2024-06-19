import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getProductsFromCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    getLengthFromCart: builder.query({
      query: () => ({
        url: "/cart/length",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    getTotalFromCart: builder.query({
      query: () => ({
        url: "/cart/total",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (credentials) => ({
        url: "/cart/add",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    deleteProductFromCart: builder.mutation({
      query: ({ id }) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),

    updateProductFromCart: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/cart/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Cart"],
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetProductsFromCartQuery,
  useAddToCartMutation,
  useDeleteProductFromCartMutation,
  useClearCartMutation,
  useUpdateProductFromCartMutation,
  useGetLengthFromCartQuery,
  useGetTotalFromCartQuery,
} = productApiSlice;
