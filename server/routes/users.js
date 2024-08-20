const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/post");
const bcrypt = require('bcrypt');


 //Update user
 router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      // If the password is provided, hash it
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSaltSync(10);
          req.body.password = await bcrypt.hashSync(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }

      // Find the user to get the old username
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }

      // Update the user profile
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true });

      // If the username is changed, update related posts
      if (req.body.username && req.body.username !== user.username) {
        await Post.updateMany(
          { username: user.username },
          { $set: { username: req.body.username } }
        );
      }

      res.status(200).json(updatedUser);
    } else {
      return res.status(403).json("You can update only your account!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

  
//Delete 
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});


//Get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;