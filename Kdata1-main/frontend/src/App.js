import React from 'react'
import Login from './Login'
import Register from './Register'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import PrivateRoute from './privateroute'
import dashboard from './dashboard'
import ForgetPassword from './ForgetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        /* 
        <Route path='/registration-form' element={<Register/>}></Route>
        <Route path='/forget-password' element={<ForgetPassword />}></Route>
        */
        <Route element={<PrivateRoute />}> {/* Sử dụng PrivateRoute như một route cha */}
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/Registercloudhosting" element={<registercloudhosting />} />
          <Route path='/registration-form' element={<Register/>}></Route>
          *
        </Route>       
      </Routes>   
    </BrowserRouter>
  )
}

export default App;
