import React, { useEffect, useState } from 'react';
import '../scss/styles/productdetails.scss';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartRedux';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  let navigate = useNavigate()
  const cart = useSelector(state => state.cart.items);
  const { id } = useParams();
  const dispatch = useDispatch();
// console.log(product)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`/products/getProduct`, { id }, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          }
        });
        const data = await response.data;
        setProduct(data.variant);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity };
    dispatch(addItem(productToAdd));
    navigate("/cart")
  };

  return (
    <div>
      <Navbar />
      <div className="single-product">
        <div className="product-image">
          <img src={product?.img} alt='image' />
        </div>
        <div className="product-details">
          <h2>{product?.title}</h2>
          <p>{product?.desc}</p>
          <p>Price: {product?.price}</p>
          <div className="color-options">
            <span style={{ display: "flex", gap: "1rem" }}>
              <div>Colors</div>
              <div style={{ color: product?.color, backgroundColor: product?.color, height: '15px', width: '15px', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>.</div>
            </span>
          </div>
          <div className="size-options">
            <span>Sizes: {product?.size}</span>
          </div>
          <div>
            <span>Quantity</span>
            <div>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => {
                  setProduct(prev=>{
                    return {
                      ...prev,
                    quantiy:parseInt(e.target.value, 10)
                    }
                  })
                  setQuantity(parseInt(e.target.value, 10))
                }}
                InputProps={{ inputProps: { min: 1 } }}
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{ marginTop: '1rem' }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
