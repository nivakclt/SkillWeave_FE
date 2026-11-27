import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RoleRoute({ role }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Checking authentication...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    const dashboard = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard'
    }

    return <Navigate to={dashboard[user.role] || '/login'} replace />
  }

  return <Outlet />
}

export default RoleRoute