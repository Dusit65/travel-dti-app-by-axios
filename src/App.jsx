//App.jsx ใช้ในการกำหนดเส้นทาง(Route)
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import MyTravel from './views/MyTravel'
import EditProfile from './views/EditProfile'
import EditMyTravel from './views/EditMyTravel'
import AddMyTravel from './views/AddMyTravel'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mytravel" element={<MyTravel />} />
        <Route path="/editprofile" element={<EditProfile />} /> 
        <Route path="/editmytravel/:travelId" element={<EditMyTravel />} />
        <Route path="/addmytravel" element={<AddMyTravel />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App