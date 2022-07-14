import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import {RecoilRoot} from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </React.StrictMode>
  </RecoilRoot>
)
