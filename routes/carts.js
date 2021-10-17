const express = require("express");
const cartsRepo = require("../repositories/carts");
const router = express.Router();

router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  console.log(cart);
  res.send("product added");
});

router.get("/", (req, res) => {});

module.exports = router;
