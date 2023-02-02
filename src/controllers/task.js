const taskServices = require('../services/task');
const HttpError = require('../utils/errors/HttpError');
const { getTaskSchema, postTaskSchema, putTaskSchema, patchTaskSchema, deleteTaskSchema } = require('../schemas/joiTask');

const getTasks = async (req, res) => {
  res.status(200).json(await taskServices.getTasks());
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {error} = getTaskSchema.validate({id: id});

    if(error) {
      throw new HttpError(400, error.details[0].message);
    }

    res.status(200).json(await taskServices.getTask(id));
  } catch(error) {
    if(error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    }else {
      res.status(500).send(error.message);
    }
  }
};

const postTask = async (req, res) => {
  try {
    const { description } = req.body;

    const {error} = postTaskSchema.validate({description: description});

    if(error) {
      throw new HttpError(400, error.details[0].message);
    }

    res.status(200).json(await taskServices.postTask(description));
  } catch(error) {
    if(error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    }else {
      res.status(500).send(error.message);
    }
  }
};

const putTask = async (req, res) => {
  try {
    const changedTask = req.body;

    const {error} = putTaskSchema.validate({changedTask: changedTask});
  
    if(error) {
      throw new HttpError(400, error.details[0].message);
    }

    res.status(200).send(await taskServices.putTask(changedTask));
  } catch (error) {
    if(error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    }else {
      res.status(500).send(error.message);
    }
  }
};

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const changedFields = req.body;
  
    const {error} = patchTaskSchema.validate({id: id, changedFields: changedFields});
  
    if(error) {
      throw new HttpError(400, error.details[0].message);
    }
  
    res.status(200).send(await taskServices.patchTask(id, changedFields));
  } catch(error) {
    if(error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    }else {
      res.status(500).send(error.message);
    }
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {error} = deleteTaskSchema.validate({id: id});
  
    if(error) {
      throw new HttpError(400, error.details[0].message);
    }
  
    res.status(200).send(await taskServices.deleteTask(id));
  } catch(error) {
    if(error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    }else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = { getTasks, getTask, postTask, putTask, patchTask, deleteTask };