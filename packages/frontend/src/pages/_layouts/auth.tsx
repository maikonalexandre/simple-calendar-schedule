import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900 text-zinc-50">
      <Outlet />
    </div>
  )
}
