const express = require("express");
const usersRepo = require("../../repositories/users");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(`
      <div>
      Your id is: ${req.session.userId}
          <form method="POST">
              <input name="email" placeholder="email" />
              <input name="password" placeholder="password" />
              <input name="passwordConfirmation" placeholder="password confirmation" />
              <button>Sign up</button>
          </form>
      </div>
    `);
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
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In</button>
        </form>
    </div>
    `);
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
