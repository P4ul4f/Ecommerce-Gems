const express = require("express");
const AsynHandler = require("express-async-handler");
const Product = require("../models/Product");
const productRoute = express.Router();

productRoute.get(
  "/",
  AsynHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

productRoute.get(
  "/:id",
  AsynHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

productRoute.post(
  "/",
  AsynHandler(async (req, res) => {
    const { name, image, description, rating, numReview, price, countInStock } =
      req.body;

    const product = new Product({
      name,
      image,
      description,
      rating,
      numReview,
      price,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

module.exports = productRoute;
