import express from "express";
import {
  getPost,
  getPosts,
  createPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();
// router.get("/", async (req, res) => {
//   const posts = await Post.find(); // GET ALL POSTS
//   res.status(200).send(posts);
// });

// !TO PREVENT CREATING MANY ENDPOINTS WILL SEPERATE CRUD OPERATIONS
router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
// DELETE POST BASED ON ID
router.delete("/:id", deletePost);

export default router;
