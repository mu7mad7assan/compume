import express, { Request, Response, NextFunction } from 'express';
import products from '../proudcts';
import Product from '../models/Product.models';


export const insertMany = async (req: Request, res: Response) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    res.status(200).json(createdProducts);
  }catch (error) {
    console.log(error);
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products)
  }catch (error) {
    console.log(error);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send({message: 'No Product is found'});
    }
  }catch(error) {
    console.log(error);
  }
}



