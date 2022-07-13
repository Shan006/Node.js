const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); // to get all the tasks
  res.status(200).json({ tasks }); // response to frontend
});

const CreateTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body); // data from frontend
  res.status(201).json({ task }); // response to frontend
});

const getTask = asyncWrapper(async (req, res, next) => {
  // const taskID = req.params.id; // simpler form of below mentioned statement.
  const { id: taskID } = req.params; //destructuring
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // res.status(404).json({ msg: `No Task with Id : ${taskID}` });
    next(createCustomError(`No Task with Id : ${taskID}`, 404));
  } //else
  res.status(200).json({ task });
});

const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  }); //second parameter with which we wanna update.
  //  Third parameter is option, by setting {new:true} it will return new document otherwise it will return previous document {runValidators: true} will trigger validation as on schema.
  if (!task) {
    next(createCustomError(`No Task with Id : ${taskID}`, 404));
  } //else
  res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    next(createCustomError(`No Task with Id : ${taskID}`, 404));
  } //else
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  CreateTasks,
  getTask,
  updateTasks,
  deleteTasks,
};
