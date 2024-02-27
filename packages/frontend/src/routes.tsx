import { createBrowserRouter } from 'react-router-dom'

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
        element: <Dashboard />,
      },
    ],
  },

  { path: '/sign-in', element: <SignIn /> },
])
