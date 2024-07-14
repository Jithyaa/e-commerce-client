import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../adminPages/Dashboard'
import Product from '../adminPages/Product'
import AddProduct from '../adminPages/AddProduct'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
    </Routes>
  )
}

export default AdminRoutes
