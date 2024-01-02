const Posts = require("../Models/PostModel");

const PostCreate = async (req, res) => {
  try {
    const { caption, imageLink } = req.body;
    const userID = req.user.userId;

    const newPost = new Posts({
      userID,
      caption,
      imageLink,
    });
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const PostLike = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked this post" });
    }

    post.likes.push(userId);

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const PostComment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const { text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: userId,
      text,
    });

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Comment on post error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { PostCreate, AllPosts, PostLike, PostComment };
