import Order from "../models/Order.models";
import {Request, Response} from 'express';
import Product from "../types/Product.type";
import { readBuilderProgram } from "typescript";
import { Date } from "mongoose";

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    const newOrder = new Order({
        orderItems : req.body.orderItems.map((x:Product) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    });
    try{
        const order = await newOrder.save();
        res.status(200).json({
            message: 'New Order Created',
            order,
        });
    }catch(error) {
        console.log(error);
    }
}


export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        }else {
            res.status(404).json({message: 'Order not found'});
        }
    }catch (error) {
        console.log(error);
    }
}

export const getOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({user: req.params.id});
    if (orders) {
        res.status(200).send(orders);
    } else {
        res.status(404).send({message: 'Orders Not found'});
    }
}


export const payOrder = async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now() as any;
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
        }
        const updatedOrder = await order.save();
        res.send({message: 'order is paid', order: updatedOrder});
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
}