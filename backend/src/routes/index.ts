import express from 'express';
import authRoutes from './api/auth.api';
import productsRoutes from './api/Products.api';
import ordersRoutes from './api/Order.api';
import userRoutes from './api/User.api'

const routes = express.Router();


routes.use('/auth', authRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/users', userRoutes);

export default routes;