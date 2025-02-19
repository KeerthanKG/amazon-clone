import React, { useState } from 'react'
import "./Login.css"
import Amazon_logo from "./Images/Amazon_Logo_Black.png"
import { Link, useNavigate } from 'react-router-dom'; 
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    // Prevents page reload
    e.preventDefault();

    // Firebase implementation to sign in
    signInWithEmailAndPassword(auth, email, password)
    .then((auth) => {
      navigator('/')
    })
    .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();

    // Firebase implementation to create an account
    createUserWithEmailAndPassword(auth, email, password)
    .then((auth) => {
      if (auth) {
        navigator('/')
      }
    })
    .catch(error => alert(error.message))
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo' 
          src={Amazon_logo}
        />
      </Link>

      <div className='login__container'>
        <h1>Sign In</h1>

        <form>
          {/* Sets the email and passwords variables when entered in */}
          <h5>Email</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

          <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
        </form>

        <p>This is a Amazon Fake Clone Webpage</p>

        <button onClick={register} className='login__registerButton'>Create your Amazon account</button>
      </div>
    </div>
  )
}

export default Login
