import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req, res) => {};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  // console.log(req.headers);
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found");
  }

  const newPost = new Post({
    user: user._id,
    ...req.body,
  });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found"); // THIS IS NOT REQUIRED BUT IT'S A GOOD PRACTICE
  }

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    // 403 => FORBIDDEN
    return res.status(403).json("You can delete only your post!");
  }
  res.status(200).json("Post has been deleted");
};
