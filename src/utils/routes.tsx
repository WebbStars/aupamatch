import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const hasUser = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')
  const notFirstLoginStorage = localStorage.getItem('notFirstLogin')
  const notFirstLogin = notFirstLoginStorage && JSON.parse(notFirstLoginStorage)
  const path = location.pathname

  if (hasUser) {
    if (role === 'ROLE_AUPAIR') {
      if (path !== '/edit_aupair') {
        if (!notFirstLogin) return <Navigate to="/edit_aupair" />
        else return <Outlet />
      } else if (notFirstLogin) return <Navigate to="/jobs" />
    }
    return <Outlet />
  }

  return <Navigate to="/login" />
}

const UnProtectedRoute: React.FC = () => {
  const hasUser = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')

  const routeToRedirect = role === 'ROLE_FAMILY' ? '/search_aupair' : '/jobs'

  return !hasUser ? <Outlet /> : <Navigate to={routeToRedirect} />
}

export { ProtectedRoute, UnProtectedRoute }
