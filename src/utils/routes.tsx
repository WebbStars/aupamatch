import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from '../store'

const ProtectedRoute: React.FC = () => {
  const hasUser = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')
  const logged = JSON.parse(sessionStorage.getItem('logged') || 'true')
  const user = useSelector((state) => state.user)

  const path = location.pathname

  if (hasUser) {
    if (role === 'ROLE_AUPAIR') {
      if (path !== '/edit_aupair') {
        if (!logged) return <Navigate to="/edit_aupair" />
        else return <Outlet />
      } else if (user && !user?.firstLogin) return <Outlet />
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
