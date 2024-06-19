import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    uploadProduct: builder.mutation({
      query: (credentials) => ({
        url: "/products/add",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/get/${id}`,
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: "/products/get-categories",
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    getProductsCategory: builder.query({
      query: (category) => ({
        url: `/products/get-products-category/${category}`,
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    searchProducts: builder.query({
      query: (search) => ({
        url: `/products/search${search}`,
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),

    filterProductController: builder.mutation({
      query: (credentials) => ({
        url: `/products/filter-products`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Product"],
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUploadProductMutation,
  useUpdateProductMutation,
  useGetProductQuery,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsCategoryQuery,
  useSearchProductsQuery,
  useFilterProductControllerMutation,
} = productApiSlice;
