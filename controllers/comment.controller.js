import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 }); // -1 MEANS DESCENDING ORDER

  res.json(comments);
};

export const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkUserId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });
  const savedComment = await newComment.save();

  // TEMPORARY TIMEOUT FUNCTION
  setTimeout(async () => {
    res.status(201).json(savedComment); // 201 => CREATED
  }, 3000);
};

export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  // COMMENT ID
  const id = req.params.id;
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }
  const user = await User.findOne({ clerkUserId });

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    // CHECKING IF THE COMMENT BELONGS TO THE USER
    user: user._id,
  });

  // IF DOESN'T EXISTS THAT MEANS NOT THE USER'S COMMENT
  if (!deletedComment) {
    // 403 => FORBIDDEN
    return res.status(403).json("You can delete only your comment");
  }
  res.status(200).json("Comment has been deleted");
};
