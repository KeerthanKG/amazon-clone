import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
  const [{}, dispatch] = useStateValue();

  const addToBasket = () => {
    // Add item to basket
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })
  }

  return (
    <div className='product'>

      <img
        src={image}
        alt=""
      />

      <div className='product__info'>
        <p className='product__infoTitle'>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating).fill().map((_, i) => (
            <p>⭐️</p>
          ))}
        </div>
      </div>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
