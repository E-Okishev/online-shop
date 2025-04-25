import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../utils";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    getProduct: build.query<ProductType, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductQuery } = productsApi;
