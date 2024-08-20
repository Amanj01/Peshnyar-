
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Single from './pages/Single'
import Write from './pages/Write'
import Setting from './pages/Setting'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'


const App = () => {
  return (
    <>
    <Navbar/>
    <div className="pt-16 min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
    <Routes>
      <Route index  element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path='/singlePost/:id' element={<Single />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/write" element={<Write />} /> 
      <Route path="/setting" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
    </div>
    </>
  )
}

export default App

