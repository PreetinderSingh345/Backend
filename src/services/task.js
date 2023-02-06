const { Task } = require('../../database/models/index');
const HttpError = require('../../src/utils/errors/HttpError');

const getTasks = async () => {
  const tasks = await Task.findAll();

  return tasks;
};

const getTask = async (id) => {
  const task = await Task.findOne({
    where: {
      id: id
    }
  });

  if (task === null) {
    throw new HttpError(404, 'Task not found');
  }

  return task;
};

const postTask = async (description) => {
  const task = await Task.create({
    description: description,
    isComplete: false
  });

  return task;
};

const putTask = async (changedTask) => {
  const updated = await Task.update({ ...changedTask }, {
    where: {
      id: changedTask.id
    }
  });

  if(updated[0] === 0) {
    throw new HttpError(404, 'Task not found');
  }

  const msg = 'Task updated successfully';

  return msg;
};

const patchTask = async (id, changedFields) => {
  const updated = await Task.update({ ...changedFields }, {
    where: {
      id: id
    }
  });

  if(updated[0] === 0) {
    throw new HttpError(404, 'Task not found');
  }

  const msg = 'Task updated successfully';

  return msg;
};

const deleteTask = async (id) => {
  const deleted = await Task.destroy({
    where: {
      id: id
    }
  });

  if(deleted === 0) {
    throw new HttpError(404, 'Task not found');
  }

  const msg = 'Task deleted successfully';

  return msg;
};

module.exports = { getTask, getTasks, postTask, putTask, patchTask, deleteTask };