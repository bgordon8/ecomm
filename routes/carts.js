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
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  console.log(cart);
  res.send("product added");
});

router.get("/", (req, res) => {});

module.exports = router;
