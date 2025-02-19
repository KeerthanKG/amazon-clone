import React, { useEffect, useState } from 'react'
import "./Payment.css"
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { getBasketTotal } from './reducer';
import CurrencyFormat from "react-currency-format"
import axios from "./axios"
import { db } from './firebase';
import { doc, setDoc, collection } from "firebase/firestore"



export default function Payment() {
  const navigator = useNavigate();
  const [{basket, user}, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // When the Buy Now is pressed, it creates a client secret to send to stripe
  // which handles the transaction
  const handleButton = async () => {
    console.log('Fetching client secret...');
    return await axios({
      method: 'post',
      url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
    }).then(response => {
      setClientSecret(response.data.clientSecret);
    });
  };
  console.log('Client Secrect: ', clientSecret)

  // Waits the the card details to be submitted and sets those details
  // to a variable
  const handleSubmit = async (e) => {
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, { 
      payment_method:{
        card: elements.getElement(CardElement)
      } 
    }).then(({ paymentIntent }) => {
      // Inserts the details of the order into Firestore
      setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id), 
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'EMPTY_BASKET'
      })

      navigator("/orders", { replace: true })
    })
  }

  // Only run handleSubmit when a valid clientSecret has been created
  useEffect(() => {
    if (clientSecret && clientSecret !== true) {
      handleSubmit(); // Call handleSubmit only when clientSecret is updated
    }
  }, [clientSecret]);

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '')
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>123 Fake Street</p>
                <p>Fake Area, Fake State</p>
            </div>
        </div>

        {/* Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className='payment__items'>
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

        {/* Payment Method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            {/* Stripe Implementation */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              await handleButton(); // Ensure client secret is fetched first
            }}>
              <CardElement onChange={handleChange}/>
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded }>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
