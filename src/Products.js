import React, { useState, useEffect } from 'react';
import { ProductStore } from './product.store';
import { addTocart } from './product.actions';
import './product.css'
import {
  Link
} from "react-router-dom";
const getDiscountPrice = (price, discount) => {
  var val1 = Number(price);
  var val2 = Number(discount) / 100;
  var totalValue = val1 - (val1 * val2)
  return totalValue.toFixed(2);
}
function Products() {
  const [data, setData] = useState([]);
  const { store, dispatch } = React.useContext(ProductStore);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.myjson.com/bins/qhnfp`);
      const json = await response.json();
      setData(json)
    }
    fetchData();
  }, []);

  const addToCart = (item) => {
    const cartItem = Object.assign(item, { quantity: 1 })
    addTocart(cartItem, dispatch)
  }
  return (
    <div className="container">
      <div className="header-container">
        <div>All Items</div>
        <div><Link className="go-to-cart-btn" to="/cart">Go To Cart <span>{store.items.length}</span></Link></div>
      </div>
      <hr></hr>

      <div className="flex-container">
        {data.length !== 0 ? data.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-img">
                <img src={item.img_url} />
              </div>
              <div className="product-info">
                <div>
                  <p>{item.name}</p>
                  <p><span className="price-strike"><span>${item.price}</span></span> ${getDiscountPrice(item.price, item.discount)}</p>
                </div>
                <div>
                  <a className="add-cart-btn" onClick={() => addToCart(item)}>Add to Cart</a>
                </div>
              </div>
              {item.discount !== 0 ? <a className="discount-ribbon">{item.discount} %off</a> : ""}
            </div>
          )
        }) : <div />}
      </div>
    </div>
  );
}

export default Products