import { useState } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { getQueryClient } from './lib/queryClient'
import { QueryClientProvider } from 'react-query'

const App = () => {
  const element = useRoutes(routes);
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}><div>{element}</div></QueryClientProvider>
}

export default App
