import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe('pk_test_51QtHTDEA9VLBIUOvE6rd5BDDLqEx4lM8OcnxOGjMYX8EiunUlLaTMNiCyfO0SfYs0OvmeP8vGcAeZUQ6viSZX8ab00sd6lpJ7H');

function App() {
  const[{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        // User Logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // User Logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route paths for each different page and each element within each page */}
          <Route path="/login" element={[<Login />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/payment" element={[<Header />, <Elements stripe={promise}><Payment/></Elements>]} />
          <Route path="/orders" element={[<Header/>, <Orders />]} />
          <Route path="/" element={[<Header />, <Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
