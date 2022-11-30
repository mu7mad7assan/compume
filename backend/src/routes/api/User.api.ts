import express from 'express';
import {isAuth} from '../../controllers/Auth.controller';
import { userUpdate } from '../../controllers/User.controller';

const routes = express.Router();

routes.put('/:id', isAuth, userUpdate);

export default routes;