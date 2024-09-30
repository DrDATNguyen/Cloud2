import React from 'react'
import Login from './Login'
import Register from './Register'
import ForgetPW from './ForgetPW'
import User from './User'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Dashboard from './product/Dashboard'
import PrivateRoute from './privateroute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        /*
        <Route path='/RegistrationForm' element={<Register/>}></Route>
        <Route path='/ForgetPassword' element={<ForgetPW />}></Route>
        <Route path='/Product' element={<Dashboard/>}></Route>
        */
        <Route element={<PrivateRoute />}> {/* Sử dụng PrivateRoute như một route cha */}
          <Route path="/ForgetPassword" element={<ForgetPW />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path='/RegistrationForm' element={<Register/>}></Route>
        </Route>


       
      </Routes>
    
    
    </BrowserRouter>
    
  )
}

export default App;
