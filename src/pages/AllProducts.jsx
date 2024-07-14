import React,{useState,useEffect} from 'react'
import axios from '../utils/axios'
import ProductCard from '../components/ProductCard'
import '../scss/styles/allproduct.scss'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  
  return (
    <div>
      <Navbar/>
    <div className="product-listing">
      <h2>Product Listing</h2>
      <div className="products">
        {/* {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      {
        products.length>0 && products.map(ele=>{
          return <ProductCard details={ele}/>
        })
      }
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AllProducts
