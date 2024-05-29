import { useState, useEffect } from 'react'
import {Log} from '@/Log.tsx'
import{Container} from '@/components/ui/container.tsx'
import {Navbar} from '@/components/ui/navbar.tsx'
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
const CLIENT_ID = process.env.REACT_APP_API_KEY;
const CLIENT_SECRET = process.env.REACT_APP_API_SECRET;

export default function Search( {searchInput} ) {
  // const [count, setCount] = useState(0)

    useEffect (() => {
        fetch('https://accounts.spotify.com/api/token')
    }
    )


  return (
    // <Router>
    <div>
      <Container> 
      <Navbar />
      <div className="content">
        {searchInput}
        </div>
      </Container>
    </div>
  )
}

