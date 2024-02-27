import { createBrowserRouter } from 'react-router-dom'

import { PaginationContextProvider } from './hooks/usePagination'
import { AuthLayout } from './pages/_layouts/auth'
import { MainLayout } from './pages/_layouts/main'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <PaginationContextProvider>
            <Dashboard />
          </PaginationContextProvider>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
