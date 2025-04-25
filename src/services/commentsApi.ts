import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType } from "../utils";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ['Comment'],
  endpoints: (build) => ({
    getComments: build.query<CommentType[], number>({
      query: (id) => `/comments?productId=${id}`,
      providesTags: () => [{ type: 'Comment', id: 'LIST' }],
    }),
    addComment: build.mutation<void, CommentType>({
      query: (comment) => ({
        url: `comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
