import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import '../scss/styles/product.scss'
import DataGridDemo from '../components/DataGridDemo'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios";
const Product = () => {
  const navigate = useNavigate()
  const handleSubmit = ()=>{
    navigate('/admin/add-product')
  }
  const [products,setProducts]=useState([]);
  const [fetched,setFetched]=useState(false);
  useEffect(()=>{
    fetchProducts()
  },[fetched])
  console.log("🔥🔥🔥",fetched)
  async function fetchProducts(){
    let response = await axios.get("/products");
    let data = await response.data;
    setProducts(data)
  }
  return (
    <div className="product">
    <Sidebar />
    <div className="product__content">
    <div className="product__header">
          <button className="product__add-button" onClick={handleSubmit}>Add Product</button>
        </div>
     <DataGridDemo products={products} setFetched={setFetched}/>
    </div>
  </div>
  )
}

export default Product
