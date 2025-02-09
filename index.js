import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDB.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());

// TO PREVENT CONFLICT WHILE USING EXPRESS JSON
app.use("/webhooks", webhookRouter);
const PORT = process.env.PORT || 8000;

// MIDDLEWARE SINCE EXPRESS DOESN'T ALLOW JSON IN REQUEST BODY
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// !ENDPOINT FOR TEST PURPOSE
// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json({ authState });
// });

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     // 401 => UNAUTHENTICATED
//     return res.status(401).json("Not authenticated");
//   }
//   res.status(200).json("Authenticated");
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("Authenticated");
// });

// ENDPOINTS
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

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
