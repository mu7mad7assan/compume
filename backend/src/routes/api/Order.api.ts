import express from 'express';
import {isAuth} from '../../controllers/Auth.controller';
import { getOrder, getOrders, payOrder, placeOrder } from '../../controllers/Order.controller';
import { CreateOrder, captureOrder } from '../../controllers/Paypal.controller';
import { payment } from '../../controllers/Stripe.controller';

const routes = express.Router();

routes.post('/placeorder', isAuth, placeOrder);
routes.post('/payment', payment);
routes.put('/order/:id/pay', isAuth, payOrder);
routes.get('/mine/:id', isAuth, getOrders);
routes.get('/order/:id', isAuth, getOrder);



export default routes;