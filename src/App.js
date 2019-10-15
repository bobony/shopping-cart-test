import React from 'react';
import Products from './Products'
import Cart from './Cart'
import './App.css';
import { ProductStoreProvider } from './product.store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header>

      </header>

      <ProductStoreProvider>
        <Router>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Router>
      </ProductStoreProvider>
    </div>
  );
}

export default App;
