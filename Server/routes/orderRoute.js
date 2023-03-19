import express from 'express';
import Order from '../models/orderModel.js';
import { isAuth, isAdmin } from '../util.js';
import expressAsyncHandler from 'express-async-handler'
const orderRouter = express.Router();

orderRouter.get("/", isAuth, expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
}));
orderRouter.get("/mine",isAuth,  expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
}));

orderRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
}));

orderRouter.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
}));

orderRouter.post("/", isAuth, expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: 'Cart is Empty' });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await order.save();
    res.status(201).send({ message: "New Order Created", order: newOrderCreated });
  }

}));

orderRouter.put("/:id/pay", isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', data: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
}));
orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;