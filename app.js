const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const port = process.env.PORT || 3000; // we'll specify port when starting

// middleware:
app.use(express.static("./public"));
app.use(express.json());

// routes:
// app.get("/hello", (req, res) => {
//   res.send("Task Manager App");
// });
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server Running on localhost: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
