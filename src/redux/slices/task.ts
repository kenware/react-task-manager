import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../service'

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (task) => ({
        url: '/api/v1/tasks',
        method: 'POST',
        body: task,
      }),
    }),
    getTasks: builder.query({
      query() {
        return '/api/v1/tasks'
      },
    }),
    getTask: builder.query({
      query(id) {
        return `/api/v1/tasks/${id}`
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/v1/tasks/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/api/v1/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
    }),
  }),
  overrideExisting: false,
})

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    task: {},
  },
  reducers: {
    setTasks: (state, { payload: tasks }) => {
      state.tasks = tasks
    },
    setTask: (state, { payload: task }) => {
      state.task = task
    },
  },
})

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetTasksQuery,
} = tasksApi
export const { setTasks, setTask } = taskSlice.actions
export default taskSlice
