import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../styles'
import {
  Home,
  Jobs,
  Login,
  PostJobs,
  Register,
  SearchAupair,
} from '../components/pages'
import { ProtectedRoute, UnProtectedRoute } from '../utils'
import EditAupair from '../components/pages/edit_aupair'

const Routes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UnProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<UnProtectedRoute />}>
          <Route path="/jobs" element={<Jobs />} />
        </Route>
        <Route path="/edit_aupair" element={<ProtectedRoute />}>
          <Route path="/edit_aupair" element={<EditAupair />} />
        </Route>
        <Route path="/post_job" element={<ProtectedRoute />}>
          <Route path="/post_job" element={<PostJobs />} />
        </Route>
        <Route path="/search_aupair" element={<ProtectedRoute />}>
          <Route path="/search_aupair" element={<SearchAupair />} />
        </Route>
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Switch>
    </ThemeProvider>
  )
}

export default Routes
