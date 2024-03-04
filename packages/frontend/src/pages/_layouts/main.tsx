import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { GradientBar } from '@/components/ui/gradientbar'
import { useAuth } from '@/hooks/useAuth'

export function MainLayout() {
  const { user, isLoading, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && isLoading === false) {
      navigate('/sign-in', { replace: true })
    }
  }, [user, navigate, isLoading])

  return (
    <div className="mb-4 min-h-screen w-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex h-full">
        {user && (
          <>
            <GradientBar className="flex min-h-screen w-1 bg-gradient-to-t sm:m-0" />
            <div className="mb-4 h-full w-full">
              <Header username={user.name} onClick={signOut} />
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
