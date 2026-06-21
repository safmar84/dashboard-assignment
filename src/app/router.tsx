import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { DeviceDetailPage } from '../pages/device-detail/DeviceDetailPage'
import { DevicesListPage } from '../pages/devices-list/DevicesListPage'
import { NotFoundPage } from '../pages/not-found/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'devices',
        element: <DevicesListPage />,
      },
      {
        path: 'devices/:deviceId',
        element: <DeviceDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
