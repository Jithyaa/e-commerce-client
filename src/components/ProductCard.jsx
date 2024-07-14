import React from 'react'
import '../scss/components/productcard.scss'
import { useNavigate } from 'react-router-dom'; 


const ProductCard = ({details}) => {
  let navigate = useNavigate();
 
  return (
    <div className="product-card" onClick={()=>navigate(`/product/${details?.variantId}`)}>
      <div className="product-card__image">
        <img src={details?.img} alt='shoe' />
      </div>
      <div className="product-card__name">{details?.title}</div>
    </div>
  );
};

export default ProductCard

