import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from '../components/auth/UserLogin';
import UserRegister from '../components/auth/UserRegister';
import FoodPartnerLogin from '../components/auth/FoodPartnerLogin';
import FoodPartnerRegister from '../components/auth/FoodPartnerRegister';


const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/user/register' element={<UserRegister />}/>
            <Route path='/user/login' element={<UserLogin />}/>
            <Route path='/food-partner/register' element={<FoodPartnerRegister />}/>
            <Route path='/food-partner/login' element={<FoodPartnerLogin />}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes