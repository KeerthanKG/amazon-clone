import React from 'react'
import "./Checkout.css"
import Ad_Banner from "./Images/Amazon_Banner.png"
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'

function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img className='checkout__ad'
          src={Ad_Banner}
          alt=''
        />
        
        <div>
          <h3>Hello, {user ? user.email: 'Guest'}</h3>
          <h2 className='checkout__title'>
            Your Shopping Basket
          </h2>

          {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
