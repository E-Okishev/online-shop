import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    getBrands: build.query<string[], void>({
      query: () => `/brands`,
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
