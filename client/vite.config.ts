import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/graphql':{
        target:"https://zerosunshop.herokuapp.com/graphql",
        changeOrigin: true,
        secure: false,
      },
      '/api':{
        target:"https://zerosunshop.herokuapp.com",
        changeOrigin: true,
        secure: false,
      },
      
    }
  },
  resolve:{
   alias:[
     {
       find: 'react-query/devtools',
       replacement: 'react-query/es/devtools/index',
     }
   ]
  }
})
