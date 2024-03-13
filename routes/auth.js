const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middlewares/requireLogin");
const { Jwt_secret } = require("../keys");

router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !password || !email) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  const existingEmail = await USER.findOne({ email: email });
  if (existingEmail) {
    res.status(400).json({ error: "Email already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new USER({
      name,
      username,
      email,
      password: hashedPassword,
    });
    newUser
      .save()
      .then((user) => {
        res.json({ message: "saved successfully" });
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }
  const userData = await USER.findOne({ email: email });
  if (!userData) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    let isMatch = await bcrypt.compare(password, userData.password);

    if (isMatch) {
      const token = jwt.sign({ _id: userData.id }, Jwt_secret);
      const { _id, name, email, username } = userData;
      return res
        .status(200)
        .json({ message: "Successfully signed in", token: token, user: {_id,name, email, username} });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

module.exports = router;
