import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
    jwtToken: '',
  },
  reducers: {
    setCredentials: (state, { payload: { jwtToken, user } }) => {
      state.user = user
      state.jwtToken = jwtToken
    },
    logout: (state) => {
      localStorage.setItem('jwtToken', '')
      localStorage.setItem('user', '')
      state.user = {
        id: '',
        name: '',
        email: '',
        role: '',
      }
      state.jwtToken = ''
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice
