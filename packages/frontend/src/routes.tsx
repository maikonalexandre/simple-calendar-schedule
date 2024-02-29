import { createBrowserRouter } from 'react-router-dom'

import { ModalProvider } from './hooks/useModal'
import { PaginationContextProvider } from './hooks/usePagination'
import { AuthLayout } from './pages/_layouts/auth'
import { MainLayout } from './pages/_layouts/main'
import { Dashboard } from './pages/app/dashboard'
import { CreateAccount } from './pages/auth/create-account'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ModalProvider>
            <PaginationContextProvider>
              <Dashboard />
            </PaginationContextProvider>
          </ModalProvider>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/create-account', element: <CreateAccount /> },
    ],
  },
])
