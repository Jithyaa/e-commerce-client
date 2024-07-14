import React, {  useState, useEffect } from 'react'
import '../scss/styles/cart.scss'
import { useSelector,useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { removeItem,updateQuantity } from '../redux/cartRedux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Cart = () => {
const dispatch = useDispatch();
const cart = useSelector(state => state.cart.items);

const handleQuantityChange = (variantId, quantity) => {
    if(quantity){
        dispatch(updateQuantity({ id: variantId, quantity }));
    }
  };

const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

useEffect(() => {
    // This will run whenever the cart state changes
    calculateTotalPrice();
}, [cart]);
const handleCartDelete = (id)=>{
    dispatch(removeItem(id))
}

const handleProceedToPayment = () => {
  // Logic to navigate to payment page or initiate payment process
  
};

return (
    <div>
        <Navbar/>
    <div className="cart-page">
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.variantId} className="cart-item">
                        <div className="item-details">
                            <span className="item-name">{item.title}</span>
                            <span className="item-price">₹ {item.price.toFixed(2)}</span>
                        </div>
                        <div className="item-quantity">
                            <input 
                                type="number" 
                                value={item.quantity} 
                                min="1"
                                onChange={(e) => handleQuantityChange(item.variantId, parseInt(e.target.value, 10))} 
                            />
                        </div>
                        <div className="item-total">
                            ₹ { (item.totalPrice).toFixed(2) }
                        </div>
                        <div className="item-total">
                        <Button variant="contained" style={{backgroundColor:"red",fontWeight:"700"}} onClick={()=>handleCartDelete(item.variantId)}>Delete</Button>
                        </div>
                    </div>
                ))}
                {cart.length===0 && <div style={{margin:"auto",color:"gray",fontSize:"2rem"}}>😤 Nothing in Cart</div>}
            </div>
            <div className="cart-total">
                <h3>Total Price: ₹ {calculateTotalPrice().toFixed(2)}</h3>
                <button className="proceed-to-payment-btn" onClick={handleProceedToPayment}>Proceed to Payment</button>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
);
};
export default Cart
