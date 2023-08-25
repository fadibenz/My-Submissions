const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, email, password } = request.body;
    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: "Username must be more than 3 chars" });
    }

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be more than 3 chars" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      name,
      hashPass,
      email
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({error: error.message});
  }
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1 });
  response.json(users);
});

module.exports = userRouter;
