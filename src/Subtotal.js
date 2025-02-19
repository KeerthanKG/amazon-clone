import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const navigator = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className='subtotal'>
      {/* Creates a currency format fo the subtotal of the order */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} Items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button onClick={e => navigator('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
