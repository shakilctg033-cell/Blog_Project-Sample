import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import {login, logout} from "./store/authslice"
import './index.css'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getcurrentuser()
    .then((userdata) => {
      if (userdata) {
        dispatch(login({userdata}))
      }
      else{
      dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className="text-3xl font-bold text-green-600 content-between flex flex-wrap ">Hello Tailwind
    <div>
      <Header/>
      <main>
        //outlet
        <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ) : null

  
}

export default App
