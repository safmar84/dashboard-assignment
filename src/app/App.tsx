import { RouterProvider } from 'react-router-dom'
import { AppQueryProvider } from './providers/QueryProvider'
import { router } from './router'

export function App() {
  return (
    <AppQueryProvider>
      <RouterProvider router={router} />
    </AppQueryProvider>
  )
}
