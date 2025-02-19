import React from 'react';
import "./Home.css";
import Banner_1 from "./Images/Amazon_Banner_1.png";
import Product from './Product';
import Product_1 from "./Images/Product_PS5.png"
import Product_2 from "./Images/Xbox .png"
import Product_3 from "./Images/Switch.png"
import Product_4 from "./Images/PS5_Digital.png"
import Product_5 from "./Images/Apple_Watch.png"
import Product_6 from "./Images/Samsung_Watch.png"
import Product_7 from "./Images/Garmin_Watch.png"
import Product_8 from "./Images/iPhone_16_Pro_Max.png"
import Product_9 from "./Images/Samsung-Galaxy-S24.png"

function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__banner__1'
          src={Banner_1}
          alt=""
        />

        {/* For each row, defines the number of product */}
        <div className='home__row'>
          <Product 
            id="1"
            title="PS5 Disc"
            price={720}
            image={Product_1}
            rating={5}
          />
          <Product 
            id="2"
            title="Xbox Series X"
            price={500}
            image={Product_2}
            rating={5}
          />
          <Product 
            id="3"
            title="Nintendo Switch"
            price={470}
            image={Product_3}
            rating={5}
          />
          <Product 
            id="4"
            title="PS5 Digital"
            price={680}
            image={Product_4}
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product 
            id="5"
            title="Apple Watch Ultra 2 49mm Black Titanium Case GPS + Cellular Milanese Loop [Large]"
            price={1549}
            image={Product_5}
            rating={5}
          />
          <Product 
            id="6"
            title="Samsung Galaxy Watch Ultra LTE 47mm (Grey)"
            price={1299}
            image={Product_6}
            rating={5}
          />
          <Product 
            id="7"
            title="Garmin fenix 8 - 51mm AMOLED Sapphire Titanium with spark orange/graphite silicone band"
            price={2049}
            image={Product_7}
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product 
            id="8"
            title="iPhone 16 Pro Max 256GB Black Titanium"
            price={2147}
            image={Product_8}
            rating={5}
          />
          <Product 
            id="9"
            title="Samsung Galaxy S24 Ultra 256GB Titanium Black"
            price={2199}
            image={Product_9}
            rating={5}
          />
        </div>

      </div>
    </div>
  )
}

export default Home