const express = require("express");
const router = express.Router();
const {
  PostCreate,
  AllPosts,
  PostLike,
  PostComment,
} = require("../Controller/PostController");
const verifyToken = require("../Middleware");

router.post("/create", verifyToken, PostCreate);
router.get("/all", verifyToken, AllPosts);
router.put("/like/:postId", verifyToken, PostLike);
router.put("/comment/:postId", verifyToken, PostComment);

module.exports = router;
