import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api/v1/',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_API_URL,
    prepareHeaders: (headers: any) => {
      headers.set(
        'authorization',
        `Bearer ${sessionStorage.getItem('jwtToken')}`,
      )
      return headers
    },
  }),
  endpoints: () => ({}),
})
