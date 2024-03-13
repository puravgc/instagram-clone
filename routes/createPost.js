const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Post = mongoose.model("Post");

router.get("/allposts", requireLogin, (req, res) => {
  let limit = req.query.limit;
  let skip = req.query.skip;
  Post.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createpost", requireLogin, (req, res) => {
  const { caption, pic } = req.body;
  if (!caption || !pic) {
    return res.status(400).json({ error: "Please provide all fields" });
  }
  const post = new Post({
    caption,
    pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ post: result, message: "Posted Successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/myposts", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    });
});

router.put("/like", requireLogin, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id name Photo")
      .exec();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id name Photo")
      .exec();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/comment", requireLogin, async (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  const result = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(result);
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .then((post) => {
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        Post.deleteOne({ _id: req.params.postId })
          .then(() => {
            res.status(200).json({ message: "Post Deleted" });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.get("/myfollowing", requireLogin, (req, res) => {
  let limit = req.query.limit;
  let skip = req.query.skip;
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name Photo")
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
module.exports = router;
