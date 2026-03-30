import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Update from './pages/Update'
import Recover from './pages/Recover'
import Delete from './pages/Delete'
import { Protected } from './components/Protected'
import { Public } from './components/Public'

function App() {

  


  return (
    <>
    <Routes>
      <Route path='/' element={<Public><Home/></Public>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Dashboard' element={<Protected><Dashboard/></Protected>}/>
      <Route path='/Update' element={<Protected><Update/></Protected>}/>
      <Route path='/Delete' element={<Protected><Delete/></Protected>}/>
      <Route path='/Recover' element={<Recover/>}/>
    </Routes>

    </>
  )
}

export default App
