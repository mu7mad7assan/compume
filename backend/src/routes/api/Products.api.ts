import express from 'express';
import { getById, getProducts, insertMany } from '../../controllers/Products.controller';

const routes = express.Router();
routes.get('/seed', insertMany);
routes.get('/show', getProducts);
routes.get('/product/:id', getById)



export default routes;