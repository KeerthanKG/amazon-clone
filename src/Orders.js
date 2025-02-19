import React, { useState, useEffect } from 'react';
import "./Orders.css"
import { useStateValue } from './StateProvider';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"; 
import Order from "./Order"

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // Everytime the user is changed, the orders by that user is fetched 
  // from Firestore
  useEffect(() => {
      if (user) {
        const ordersRef = collection(db, "users", user?.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
  
        onSnapshot(q, (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      } else {
        setOrders([])
      }

  }, [user])
  

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {/* For each seperate order create a order element */}
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
