import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import Search from './pages/search.tsx'
import NotFoundPage from './pages/notfound.tsx'
import './index.css'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <NotFoundPage />
},
{
  path: 'search',
  element: <Search />

}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
