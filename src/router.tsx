import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BaseRoute from './pages/base'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/tasks'
import TaskDetails from './pages/taskDetails'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<BaseRoute Component={Tasks} />} />
      <Route path="/login" element={<BaseRoute Component={Login} />} />
      <Route path="/register" element={<BaseRoute Component={Register} />} />
      <Route path="/tasks" element={<BaseRoute Component={Tasks} />} />
      <Route
        path="/tasks/detail"
        element={<BaseRoute Component={TaskDetails} />}
      />
    </Routes>
  </BrowserRouter>
)
export default Router
