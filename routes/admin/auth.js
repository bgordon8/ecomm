const express = require("express");
const { check, validationResult } = require("express-validator");

const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfiramtion,
} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfiramtion],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password, passwordConfirmation } = req.body;
    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send("Account created!!");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePassword(
    user.password,
    password
  );

  if (!validPassword) {
    res.send("Invalid Password");
  }

  req.session.userId = user.id;
  res.send("You are signed in!");
});

module.exports = router;
