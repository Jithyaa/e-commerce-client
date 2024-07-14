import React, { useEffect, useState } from 'react'
import '../scss/styles/slider.scss'
const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
        'https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
        'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
    ];

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Adjust timing as needed
        return () => clearInterval(interval);
    }, [currentIndex]);
    return (
        <div className="slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={index === currentIndex ? 'slide active' : 'slide'}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
        </div>
    )
}

export default Slider
