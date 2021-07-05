const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["lkjlkjoijsdgnw922t"],
  })
);

app.get("/signup", (req, res) => {
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

app.post("/signup", async (req, res) => {
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

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
