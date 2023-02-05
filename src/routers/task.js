const express = require('express');
const { getTask, getTasks, postTask, putTask, patchTask, deleteTask } = require('../controllers/task');
const {getTasksValidator, postTaskValidator, putTaskValidator, patchTaskValidator, deleteTaskValidator} = require('../middleware/taskValidator');

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTasksValidator, getTask);

taskRouter.post('/', postTaskValidator, postTask);

taskRouter.put('/', putTaskValidator, putTask);

taskRouter.patch('/:id', patchTaskValidator, patchTask);

taskRouter.delete('/:id', deleteTaskValidator, deleteTask);

module.exports = taskRouter;