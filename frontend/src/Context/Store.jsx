import React, { createContext, useMemo, useReducer } from 'react';
import reducer from './Ctx.reducer';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  cart: {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    shippingAddress: localStorage.getItem('ShippingAddress')
      ? JSON.parse(localStorage.getItem('ShippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : ''
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const providerValue = useMemo(() => value, [value]);
  return <Store.Provider value={providerValue}>{props.children}</Store.Provider>;
}
