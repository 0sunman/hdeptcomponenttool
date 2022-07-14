import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { getQueryClient } from './lib/queryClient'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const App = () => {
  const [count, setCount] = useState<number>(0)
  const element = useRoutes(routes);
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}><div>{element}</div><ReactQueryDevtools initialIsOpen={false} /></QueryClientProvider>
}

export default App
