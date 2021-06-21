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
  const { email, password, passwordConformation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already exists");
  }
  if (password.value !== passwordConformation.value) {
    res.send("Passwords must match");
  }
  res.send("Account created!!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
