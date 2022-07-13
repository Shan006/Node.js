const express = require("express");
const Router = express.Router();
const {
  getAllTasks,
  CreateTasks,
  getTask,
  updateTasks,
  deleteTasks,
} = require("../controllers/tasksControllers");

Router.route("/").get(getAllTasks).post(CreateTasks);
Router.route("/:id").get(getTask).patch(updateTasks).delete(deleteTasks);

module.exports = Router;
