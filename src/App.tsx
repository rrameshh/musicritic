import { useState } from 'react'
import {Log} from '@/Log.tsx'
import{Container} from '@/components/ui/container.tsx'
import {Navbar} from '@/components/ui/navbar.tsx'
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'

export default function Root() {
  // const [count, setCount] = useState(0)

  return (
    // <Router>
    <div>
      <Container>
      <Navbar />
      <div className="content">

        </div>
      </Container>
     
      {/* <Log></ Log> */}
    </div>
  )
}

