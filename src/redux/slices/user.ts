import { apiSlice } from '../service'

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/api/v1/users/login/',
        method: 'POST',
        body: loginData,
      }),
      transformResponse: (response: any) => {
        console.log(response)
        localStorage.setItem('jwtToken', response.data?.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response
      },
    }),
    signUpAccount: builder.mutation({
      query: (signUpBody) => ({
        url: '/api/v1/users/create/',
        method: 'POST',
        body: signUpBody,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useSignUpAccountMutation } = usersApi
