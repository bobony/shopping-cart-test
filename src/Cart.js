import React, { useState, useEffect } from 'react';
import { ProductStore } from './product.store';
import { addTocart, cartQuantity } from './product.actions';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './product.css'

const sumofItems = (items) => {
    return items.reduce((a, b) => a + b.price, 0);
}

const sumofDiscount = (items) => {
    return items.reduce((a, b) => a + b.discount, 0);
}
const getDiscountPrice = (price, discount) => {
    var val1 = Number(price);
    var val2 = Number(discount) / 100;
    var totalValue = val1 - (val1 * val2)
    return totalValue.toFixed(2);
}
function Cart() {

    const { store, dispatch } = React.useContext(ProductStore);
    const itemChange = (id, quantity) => {
        let newObj = Object.assign([], store.items)
        const targetIndex = newObj.findIndex(item => {
            return item.id == id;
        });
        if (targetIndex !== -1) {
            newObj[targetIndex].quantity = Number(quantity);

        }
        cartQuantity(newObj, dispatch)
    }
    useEffect(() => {
        cartQuantity(store.items, dispatch)
    }, []);
    const inputChange = (event, item) => {
        let newObj = Object.assign([], store.items)
        const targetIndex = newObj.findIndex(item => {
            return item.id == event.target.id;
        });
        if (targetIndex !== -1) {
            newObj[targetIndex].quantity = Number(event.target.value);

        }
        cartQuantity(newObj, dispatch)

    }
    return (
        <div className="container">
            <div className="header-container">
                <div><Link style={{ textDecoration: "none", color: '#333' }} to="/">{"<"}</Link> Order Summary</div>
            </div>
            <hr></hr>

            <div className="flex-container">
                <div>
                    <table>
                        <tr style={{ borderTop: '1px solid #e2e2e2', borderBottom: '1px solid #e2e2e2' }}>
                            <th style={{ width: 300 }}>Items({store.items.length})</th>
                            <th style={{ width: 100 }}>Qty</th>
                            <th style={{ width: 50 }}>Price</th>
                        </tr>
                        {store.items.length !== 0 ? store.items.map((item, index) => {
                            return (

                                <tr key={item.id}>
                                    <td style={{ width: 300, border: '1px solid #e2e2e2' }}>{item.name}</td>
                                    <td style={{ width: 100 }}><a onClick={() => itemChange(item.id, item.quantity - 1)}>-</a> <input type="number" id={item.id} value={item.quantity} onChange={(event) => inputChange(event, item)} /> <a onClick={() => itemChange(item.id, item.quantity + 1)}>+</a></td>
                                    <td style={{ width: 50 }}>${item.quantity * item.price}</td>
                                </tr>
                            )

                        }) : <div />}
                    </table>
                </div>
                <div className="cart-summary">
                    <p>Total</p>
                    <p>Items({store.items.length}): ${sumofItems(store.items)}</p>
                    <p>Discount: ${getDiscountPrice(sumofItems(store.items), sumofDiscount(store.items)) - sumofItems(store.items)}</p>
                    <p>Order Total: ${sumofItems(store.items) + (getDiscountPrice(sumofItems(store.items), sumofDiscount(store.items)) - sumofItems(store.items))}</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Cart