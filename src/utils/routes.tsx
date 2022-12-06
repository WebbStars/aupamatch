import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const hasUser = sessionStorage.getItem('accessToken')
  return hasUser ? <Outlet /> : <Navigate to="/login" />
}

const UnProtectedRoute: React.FC = () => {
  const hasUser = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')

  const routeToRedirect = role === 'ROLE_FAMILY' ? '/search_aupair' : '/jobs'

  return !hasUser ? <Outlet /> : <Navigate to={routeToRedirect} />
}

export { ProtectedRoute, UnProtectedRoute }
