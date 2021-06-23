const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign up</button>
        </form>
    </div>
  `);
});

app.post("/", async (req, res) => {
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

    res.send("Account created!!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
