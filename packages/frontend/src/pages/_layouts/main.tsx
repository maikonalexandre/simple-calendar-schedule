import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function MainLayout() {
  return (
    <div className="h-full w-full bg-zinc-900 text-zinc-50">
      <div className="flex h-full">
        <div className="h-screen w-1 bg-gradient-to-t from-green-300 via-blue-500 to-purple-600"></div>
        <div className="h-full w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
