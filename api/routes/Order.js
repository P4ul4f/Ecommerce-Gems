const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;
    console.log(orderItems);

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found");
    } else {
      const order = new Order({
        orderItems,
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });

      // const newOrder =  new UserOrder({
      //   userId: '1',
      //   customerId: '1',
      //   productId: '652b2e458077fd5b243a06ad',
      //   quantity: 1,
      //   subtotal: 12 / 100,
      //   total: 12 / 100,
      //   payment_status: '3',
      // });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

//order detail

orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);


//update order status for payment

//order payment route
orderRoute.put(
  "/:id/payment",
  protect,
  asyncHandler(async (req, res) => {
    const { paymentResult, shippingAddress } = req.body; // Extraer datos del cuerpo de la solicitud
    const order = await Order.findById(req.params.id); // Buscar la orden por ID

    if (order) {
      // Actualizar solo los campos necesarios
      if (shippingAddress) {
        order.shippingAddress = shippingAddress; // Actualizar la dirección de envío
      } else {
        console.log("Shipping address is missing."); // Manejo de error si no se proporciona la dirección
      }

      // Actualizar información del pago
      if (paymentResult) {
        order.isPaid = true; // Marcar la orden como pagada
        order.paidAt = Date.now(); // Establecer la fecha de pago
        order.paymentResult = {
          id: paymentResult.id,
          status: paymentResult.status,
          updated_time: paymentResult.updated_time,
          email_address: paymentResult.email_address,
        };
      }
      
      if (order.shippingAddress && order.isPaid) {
        order.isCompleted = true; // Marcar la orden como completada
      }

      // Guardar los cambios en la base de datos
      const updatedOrder = await order.save(); 
      res.status(200).json(updatedOrder); // Enviar respuesta con la orden actualizada
    } else {
      res.status(404);
      throw new Error("Order Not Found"); // Manejo de error si no se encuentra la orden
    }
  })
);


// order lists

orderRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Orders Not Found");
    }
  })
);

//stripe payment

module.exports = orderRoute;
