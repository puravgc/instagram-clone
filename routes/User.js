const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const USER = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/model");

router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name Photo")
        .then((posts) => {
          res.json({ user, posts });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

router.put("/follow", requireLogin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { following: req.body.followId } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.followId,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.body.followId } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/uploadprofilepic", requireLogin, (req, res) => {
  try {
    USER.findByIdAndUpdate(
      req.user._id,
      { $set: { Photo: req.body.pic } },
      { new: true }
    ).then((data) => res.json(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search/:searchText", requireLogin, (req, res) => {
  const searchText = req.params.searchText;
  if (!searchText) {
    return res.status(400).json({ error: "Search text is required" });
  }
  const regex = new RegExp(searchText, "i");

  User.find({ name: { $regex: regex } })
    .then((data) => res.json(data))
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
