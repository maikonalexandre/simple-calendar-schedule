import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function MainLayout() {
  return (
    <div className="w-full px-4">
      <Header />
      <Outlet />
    </div>
  )
}
