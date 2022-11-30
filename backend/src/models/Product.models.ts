import mongoose from 'mongoose';


const { Schema } = mongoose;


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    image:{
      type: Array,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    countInStock: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    numReviews: {
      type: Number,
      required: true
    },
    productDetails: {
      color: {
        type: String,
        required: true
      },
      ConnectivityTechnology:{
        type: String,
        required: true
      }
    },
    description: {
      type: String,
      required: true
    }
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;