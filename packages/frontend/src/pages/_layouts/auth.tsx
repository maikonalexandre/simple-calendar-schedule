import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center dark:bg-zinc-950 dark:text-zinc-50">
      <Outlet />
    </div>
  )
}
