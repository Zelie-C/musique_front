import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Connexion from './routes/Connexion'
import './index.css'
import Home from './routes/Home'
import AddSong from './routes/AddSong'
import Update from './routes/Update'

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
  },
  {
    path: '/add',
    element: <AddSong />
  },
  {
    path: '/update',
    element: <Update />
  },
  {
    path: '/update/:id',
    element: <Update />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
