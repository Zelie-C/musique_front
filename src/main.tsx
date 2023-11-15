import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Connexion from './routes/Connexion'
import './index.css'
import Home from './routes/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Connexion />
  },
  {
    path: "/connexion",
    element: <Connexion />
  },
  {
    path: '/home/',
    element: <Home />
  },
  {
    path: '/home/:username',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
