import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/themeProvider'
import { env } from './config/env'
import { queryClient } from './config/react-query'
import { AuthProvider } from './hooks/useAuth'
import { router } from './routes'

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {env.MODE === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}

        <AuthProvider>
          <Toaster richColors theme="dark" position="top-right" />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
