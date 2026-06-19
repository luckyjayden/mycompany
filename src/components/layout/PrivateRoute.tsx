import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'

export function PrivateRoute() {
  const { user, isLoading } = useAuthStore()
  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" /></div>
  if (!user) return <Navigate to="/auth/login" replace />
  return <Outlet />
}

export function AdminRoute() {
  const { isAdmin, isLoading } = useAuthStore()
  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" /></div>
  if (!isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}
