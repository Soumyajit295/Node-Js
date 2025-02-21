import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginForm from './pages/Login';
import SignupForm from './pages/Signup';
import ForgotPasswordForm from './pages/ForgetPassword';
import ResetPasswordForm from './pages/ResetPassword';

import axios from 'axios';
import toast from 'react-hot-toast';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminAuth from './components/AdminAuth';
import AdminPage from './pages/AdminPage';
import LoggedInAuth from './components/LoggedInAuth';
import OTPForm from './pages/SendOtp';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/forgetpassword' element={<ForgotPasswordForm/>}/>
          <Route path='/resetpassword/:_id/:jwtToken' element={<ResetPasswordForm/>}/>
          <Route path='/unauthorized' element={<UnauthorizedPage/>}/>

          <Route element={<AdminAuth/>}>
            <Route path='/admin' element={<AdminPage/>}/>
          </Route>

          <Route element={<LoggedInAuth/>}>
            <Route path='/sendotp' element={<OTPForm/>}/>
          </Route>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
