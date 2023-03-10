const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.find((user) => user.username === username);

    if (userExists) {
      alert("This username is taken")
      res.status(400).send("This username is taken");
      return userExists;
    } else {
      console.log(username + password)
      if (password) {
        const newUser = await User.create({ username, password });

        req.session.save(() => {
          req.session.user_id = newUser.username;
          req.session.logged_in = true;

          res.status(200).json("User created");
        });
      } else {
        alert("password needs to be at least 8 characters");
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.logged_in = false;
    req.session.destroy(() => {
      res.status(204).redirect("/login");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
