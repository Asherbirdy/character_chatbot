import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner, Center } from '@chakra-ui/react'

export function App() {
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      }
    >
      <Outlet />
    </Suspense>
  )
}