import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import Login from '../pages/login'
import AllProducts from '../pages/AllProducts'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'


const UserRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/allproduct' element={<AllProducts/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>

    </Routes>
  )
}

export default UserRoutes
