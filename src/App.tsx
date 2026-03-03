import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export function App() {
  return (
    <Suspense
      fallback={
        <div>
          <p>Loading...</p>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  )
}