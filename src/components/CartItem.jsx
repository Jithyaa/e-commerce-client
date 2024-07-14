import React from 'react'

const CartItem = (item) => {
    return (
        <div className="cart-item">
          <img className="cart-item-img" src={item.imageUrl} alt={item.title} />
          <div className="cart-item-details">
            <h3 className="cart-item-title">{item.title}</h3>
            <p className="cart-item-price">${item.price}</p>
            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
          </div>
        </div>
      );
    };

export default CartItem
