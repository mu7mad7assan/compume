export default (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: ''
        }
      };
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM':
      const filteredItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
      return { ...state, cart: { ...state.cart, cartItems: filteredItems } };
    case 'SAVE_SHIPPING_ADDRESS':
      localStorage.setItem('ShippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload
        }
      };
    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', action.payload);
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      };
    case 'CART_CLEAR':
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: []
        }
      };
    default:
      return state;
  }
};
