import { useContext, useRef } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ToastContext } from '../App'

export function PermissionRoute({ modulo }) {
  const { isAdmin, permissoes } = useAuth()
  const { showToast } = useContext(ToastContext)
  const location = useLocation()
  const hasToasted = useRef(false)

  if (isAdmin || permissoes?.[modulo]) {
    hasToasted.current = false
    return <Outlet />
  }

  if (!hasToasted.current) {
    hasToasted.current = true
    setTimeout(() => showToast('Você não tem permissão para acessar este módulo.', 'error'), 0)
  }

  return <Navigate to="/" replace state={{ from: location }} />
}

export function AdminRoute() {
  const { isAdmin } = useAuth()

  if (!isAdmin) return <Navigate to="/" replace />

  return <Outlet />
}
