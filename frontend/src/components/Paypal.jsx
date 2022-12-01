import React, { useEffect, useRef } from 'react';

const Paypal = (props) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return fetch(`/api/orders/order/${props.orderId}/pay`, {
            method: 'POST'
          })
            .then((response) => response.json())
            .then((order) => order.id)
            .catch((error) => console.log(error));
        },
        onApprove: (data, actions) => {
          return fetch(`/api/orders/order/${props.orderId}/capture`, {
            method: 'POST'
          })
            .then((response) => Response.json())
            .then((orderData) => {
              console.log('capture Results', orderData, JSON.stringify(orderData, null, 2));
            });
        }
      })
      .render(paypal.current);
  }, [paypal]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default Paypal;
