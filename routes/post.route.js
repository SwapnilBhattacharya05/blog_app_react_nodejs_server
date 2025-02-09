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

/*
 ! MAKING APP MORE SECURE
 * WE DON'T NEED TO DO ANYTHING SINCE ANYONE CAN FETCH POSTS
 * DURING POST UPDATE OR DELETE WE HAVE TO VERIFY OUR USER FIRST
 * GET USER SESSION TOKKEN FROM CLIENT AND VERIFY TOKEN FROM SERVER
 */
router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
// DELETE POST BASED ON ID
router.delete("/:id", deletePost);

export default router;
