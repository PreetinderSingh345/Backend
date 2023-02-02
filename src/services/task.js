const { Task } = require('../../database/models/index');

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
  const updated = await Task.update({...changedTask}, {
    where: {
      id: changedTask.id
    }
  });

  const msg = updated[0] ? 'Task updated successfully': 'Unable to update Task';

  return msg;
};

const patchTask = async (id, changedFields) => {
  const updated = await Task.update({...changedFields}, {
    where: {
      id: id
    }
  });

  console.log(updated);

  const msg = updated[0] ? 'Task updated successfully': 'Unable to update Task';

  return msg;
};

const deleteTask = async (id) => {
  const deleted = await Task.destroy({
    where: {
      id: id
    }
  });

  console.log(deleted);

  const msg = deleted ? 'Task deleted successfully': 'Unable to delete Task';

  return msg;
};

module.exports = { getTask, getTasks, postTask, putTask, patchTask, deleteTask };