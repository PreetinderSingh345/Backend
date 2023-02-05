const taskServices = require('../services/task');

const getTasks = async (req, res) => {
  res.status(200).json(await taskServices.getTasks());
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json(await taskServices.getTask(id));
  } catch(error) {
    res.status(500).send(error.message);
  }
};

const postTask = async (req, res) => {
  try {
    const { description } = req.body;

    res.status(200).json(await taskServices.postTask(description));
  } catch(error) {
    res.status(500).send(error.message);
  }
};

const putTask = async (req, res) => {
  try {
    const changedTask = req.body;

    res.status(200).send(await taskServices.putTask(changedTask));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const changedFields = req.body;
  
    res.status(200).send(await taskServices.patchTask(id, changedFields));
  } catch(error) {
    res.status(500).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).send(await taskServices.deleteTask(id));
  } catch(error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getTasks, getTask, postTask, putTask, patchTask, deleteTask };