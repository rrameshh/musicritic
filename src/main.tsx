import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import Authorization from './authorization.tsx'
import Searchbar from './pages/searchbar.tsx'
import NotFoundPage from './pages/notfound.tsx'
import './index.css'
import AlbumDetailPage from './pages/albumdetail.tsx'
import Guesthome from './pages/guesthome.tsx'



const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <NotFoundPage />
},
{
  path: 'results',
  element: <Searchbar />
},
{
  path: "/album/:id", 
  element: <AlbumDetailPage/>
},
{
  path:"guest-home",
  element: <Guesthome/>
}

]);
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
