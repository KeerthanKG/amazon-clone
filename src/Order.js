import React from 'react';
import "./Order.css";
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
  return (
    <div className='order'>
      <h2>Order</h2>
      {/* Formats the date variable */}
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

      <p className='order__id'>
        <small>{order.id}</small>
      </p>

      {/* For each item create a CheckoutProduct element */}
      {order.data.basket?.map(item => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      {/* Sets a currency format for the total value of the order */}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={'$'}
      />
    </div>
  )
}

export default Order
