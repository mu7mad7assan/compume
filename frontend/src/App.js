import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './privateRoutes';
import Home from './screens/Home';
import Login from './screens/Login';
import Shop from './screens/Shop';
import Register from './screens/Register';
import Product from './screens/Product';
import PaymentMethod from './screens/paymentMethod';
import ShippingAddress from './screens/ShippingAddress';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shippingAddress" element={<ShippingAddress />} />
          <Route path="/paymentMethod" element={<PaymentMethod />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
