const express = require("express");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
      res.send("Email already exists");
    }
    if (password !== passwordConfirmation) {
      res.send("Passwords must match");
    }

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send("Account created!!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

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
