import React from 'react'
import './Header.css'
import logo from './Images/Amazon-Logo-White-PNG-Image.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Header() {
  const [{ basket, user }] = useStateValue();

  // Signs the user out using Firebase
  const handleAuthentication = () => {
    if (user) {
      signOut(auth)
    }
  }

  return (
    <div className='header'>
      {/* Makes the amazon logo into a clickable link to the home page */}
      <Link to="/">
        <img className='header__logo' 
          src={logo}
        />
      </Link>

      <div className='header__search'>
        <input className='header__searchInput' 
          type='text'/>
          <SearchIcon 
          className='header__searchIcon'/>
      </div>

      <div className='header__nav'>
        {/* Navigates the user to the login page if they are not logged in  */}
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className='header__option'>
            <span
              className='header__optionLineOne'>
                Hello, {user ? user.email: 'Guest'}
            </span>

            <span
              className='header__optionLineTwo'>
                {user ? 'Sign Out': 'Sign In'}
            </span>
          </div>
        </Link>

        {/* Navigation option to the orders page */}
        <Link to='/orders'>
          <div className='header__option'>
            <span
              className='header__optionLineOne'>
                Returns
            </span>

            <span
              className='header__optionLineTwo'>
                & Orders
            </span>
          </div>
        </Link>

        <div className='header__option'>
          <span
            className='header__optionLineOne'>
              Your
          </span>

          <span
            className='header__optionLineTwo'>
              Prime
          </span>
        </div>

        {/* Navigation option to the checkout page */}
        <Link to="/checkout">
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span
              className='header__optionLineTwo header__basketCount'>
                {basket?.length}
            </span>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Header

