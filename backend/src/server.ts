import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import paypal from 'paypal-rest-sdk';
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID as string,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET as string,
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', routes)
// data base connection
db().catch(err => console.log(err));

async function db() {
  await mongoose.connect(process.env.MONGODB_URL as string);
  console.log('connected to db')
}


app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
})
app.get('/', (req: Request, res: Response) => {
    res.send('hello');
})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
});