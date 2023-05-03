import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from '../store'
import { fetchUserProfile } from '../store/user'

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch()
  const hasUser = sessionStorage.getItem('accessToken')
  const role = sessionStorage.getItem('role')
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const asyncEffect = async () => {
      dispatch(await fetchUserProfile(hasUser!))
    }

    asyncEffect()
  }, [])

  const path = location.pathname

  if (hasUser) {
    if (role === 'ROLE_AUPAIR') {
      if (path !== '/edit_aupair') {
        if (!user) return <Navigate to="/edit_aupair" />
        else return <Outlet />
      } else if (user && !user?.firstLogin) return <Navigate to="/jobs" />
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
