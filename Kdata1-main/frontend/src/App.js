import React from 'react'
// import Login from './Login'
// import Register from './Register'
// import ForgetPW from './ForgetPW'
// import User from './User'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Dashboard from './product/Dashboard'
// import PrivateRoute from './privateroute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Sửa đổi ở đây

import 'bootstrap/dist/css/bootstrap.min.css';
import { publicRoutes } from './route/index';
// import Layout from './components/layout';

function App() {
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path='/' element={<Login />}></Route>
  //       /*
  //       <Route path='/RegistrationForm' element={<Register />}></Route>
  //       <Route path='/ForgetPassword' element={<ForgetPW />}></Route>
  //       <Route path='/Product' element={<Dashboard />}></Route>
  //       */
  //       <Route element={<PrivateRoute />}> {/* Sử dụng PrivateRoute như một route cha */}
  //         <Route path="/ForgetPassword" element={<ForgetPW />} />
  //         <Route path="/Dashboard" element={<Dashboard />} />
  //         <Route path='/RegistrationForm' element={<Register />}></Route>
  //       </Route>



  //     </Routes>


  //   </BrowserRouter>

  // )
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={
              // <Layout>
              <Page />
              // </Layout>
            } />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
