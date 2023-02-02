const express = require('express');
const { getTask, getTasks, postTask, putTask, patchTask, deleteTask } = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTask);

taskRouter.post('/', postTask);

taskRouter.put('/', putTask);

taskRouter.patch('/:id', patchTask);

taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;