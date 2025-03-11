import React, { useContext } from 'react'
import {Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import  Result  from './pages/Result.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import { AppContext } from './context/AppContext.jsx'

const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-red-100 to-orange-200'>
      <Toaster/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
      <Footer/>
      
      
      
    </div>
  )
}

export default App
