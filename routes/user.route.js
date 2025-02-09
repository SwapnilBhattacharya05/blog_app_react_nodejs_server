import express from "express";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/saved", getUserSavedPosts);
// TO UPDATE THE USER'S savedPosts ARRAY
router.patch("/save", savePost);

export default router;
