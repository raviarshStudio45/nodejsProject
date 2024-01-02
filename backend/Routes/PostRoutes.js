const express = require("express");
const router = express.Router();
const {
  PostCreate,
  AllPosts,
  UserPosts,
  PostLike,
  PostComment,
} = require("../Controller/PostController");
const verifyToken = require("../Middleware");

router.post("/create", verifyToken, PostCreate);
router.get("/user-posts", verifyToken, UserPosts);
router.get("/all", AllPosts);
router.put("/like/:postId/:userId", verifyToken, PostLike);
router.put("/comment/:postId/:userId", verifyToken, PostComment);

module.exports = router;
