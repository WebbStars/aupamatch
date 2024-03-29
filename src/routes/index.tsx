import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../styles'
import {
  FavoriteJobs,
  Home,
  Jobs,
  Login,
  PostJobs,
  Register,
  SearchAupair,
} from '../components/pages'
import { ProtectedRoute, UnProtectedRoute } from '../utils'
import EditAupair from '../components/pages/edit_aupair'
import MyJobs from '../components/pages/my_jobs'
import MyApplies from '../components/pages/my_applies'
import EditJob from '../components/pages/edit_jobs'
import MyProfile from '../components/pages/my_profile'
import VerifyUserEmail from '../components/pages/reset_password/pages/verify_email'
import SendToken from '../components/pages/reset_password/pages/send_token'
import ChangePassword from '../components/pages/reset_password/pages/change_password'

const Routes: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UnProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/verify_email" element={<UnProtectedRoute />}>
          <Route path="/verify_email" element={<VerifyUserEmail />} />
        </Route>
        <Route path="/send_token" element={<UnProtectedRoute />}>
          <Route path="/send_token" element={<SendToken />} />
        </Route>
        <Route path="/change_password" element={<UnProtectedRoute />}>
          <Route path="/change_password" element={<ChangePassword />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/my_profile" element={<ProtectedRoute />}>
          <Route path="/my_profile" element={<MyProfile />} />
        </Route>
        <Route path="/jobs" element={<ProtectedRoute />}>
          <Route path="/jobs" element={<Jobs />} />
        </Route>
        <Route path="/edit_aupair" element={<ProtectedRoute />}>
          <Route path="/edit_aupair" element={<EditAupair />} />
        </Route>
        <Route path="/post_job" element={<ProtectedRoute />}>
          <Route path="/post_job" element={<PostJobs />} />
        </Route>
        <Route path="/edit_job" element={<ProtectedRoute />}>
          <Route path="/edit_job/:id" element={<EditJob />} />
        </Route>
        <Route path="/search_aupair" element={<ProtectedRoute />}>
          <Route path="/search_aupair" element={<SearchAupair />} />
        </Route>
        <Route path="/favorite_jobs" element={<ProtectedRoute />}>
          <Route path="/favorite_jobs" element={<FavoriteJobs />} />
        </Route>
        <Route path="/my_jobs" element={<ProtectedRoute />}>
          <Route path="/my_jobs" element={<MyJobs />} />
        </Route>
        <Route path="/my_applies" element={<ProtectedRoute />}>
          <Route path="/my_applies" element={<MyApplies />} />
        </Route>
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Switch>
    </ThemeProvider>
  )
}

export default Routes
