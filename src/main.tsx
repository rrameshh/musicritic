import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import Searchbar from './pages/searchbar.tsx'
import NotFoundPage from './pages/notfound.tsx'
// import {Searchbar} from '@components/ui/searchbar.tsx'
import AlbumCover from './pages/results.tsx'
import './index.css'
import Results from './pages/results.tsx'
import AlbumDetailPage from './pages/albumdetail.tsx'



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
}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
