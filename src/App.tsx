import { useState } from 'react'
import {Log} from '@/Log.tsx'
import {Navbar} from '@/components/ui/navbar.tsx'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <body className = "dark">
    <div>
      <Navbar></Navbar>
      {/* <Log></ Log> */}
    </div>
    </body>
  )
}

export default App
