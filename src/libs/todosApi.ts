import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type ResponseTodos = Todo[];

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTodos: builder.query<ResponseTodos, string | void>({
      query: (query = "") => ({
        url: `/todos${query}`,
      }),
      providesTags: ["Todos"],
    }),
    addNewTodo: builder.mutation({
      query: (payload) => ({
        url: "/todos",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // All cached data with "Todos" tag will be re-fetched.
      invalidatesTags: ["Todos"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  util: { getRunningQueriesThunk },
} = todosApi;

// Export endpoints for usage in SSR
export const { getTodos } = todosApi.endpoints;
