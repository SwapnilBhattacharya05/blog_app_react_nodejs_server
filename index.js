import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDB.js";

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARE SINCE EXPRESS DOESN'T ALLOW JSON IN REQUEST BODY
app.use(express.json());

/*
 * BEFORE EXPRESS 5 WE HAD TO WRAP OUR PROMISES WITHING TRY_CATCH
 * AND WE HAVE ANY ERROR HANDLER IN index.js HAVE TO WRITE next, AND THROW THE ERROR
 * NOW WE CAN DEFINE ERROR HANDLER IN index.js IT WILL AUTOMATICALLY CATCH IT AND SHOW US OUR ERROR
 */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

// app.get("/test", (req, res) => {
//   res.status(200).send("Hooray!");
// });

// ENDPOINTS
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
