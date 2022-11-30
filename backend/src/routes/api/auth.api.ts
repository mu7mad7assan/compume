import express from 'express';
import { isAuth, isLoggedIn, login, logout, register } from '../../controllers/Auth.controller';

const routes = express.Router();


routes.post('/register', register);
routes.post('/login', login);
routes.get('/logout', logout);
routes.get('/isloggedin', isLoggedIn)

export default routes;