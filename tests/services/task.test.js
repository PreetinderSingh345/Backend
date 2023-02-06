const {describe, it, expect} = require('@jest/globals');
const taskServices=require('../../src/services/task');
const {Task} = require('../../database/models');

describe('Task services', () => {
  describe('getTasks', () =>{
    it('should return an array of tasks', async () => {
      const resolvedValue = [{
        id: 1,
        description: 'learn backend',
        isComplete: false
      }];

      jest.spyOn(Task, 'findAll').mockResolvedValue(resolvedValue);

      const returnedValue = await taskServices.getTasks();

      expect(returnedValue).toEqual(resolvedValue);
    });
  });

  describe('getTask', () => {
    it('should return the task with the given id', async () => {
      const resolvedValue = {
        id: 1,
        description: 'learn backend',
        isComplete: false
      };

      jest.spyOn(Task, 'findOne').mockResolvedValue(resolvedValue);

      const mockId = 1;

      const returnedValue = await taskServices.getTask(mockId);

      expect(returnedValue).toEqual(resolvedValue);
    });

    it('should throw an error if the task does not exist', async () => {
      const resolvedValue = null;

      jest.spyOn(Task, 'findOne').mockResolvedValue(resolvedValue);

      const mockId = 123;

      await expect(taskServices.getTask(mockId)).rejects.toThrow('Task not found');
    });
  });

  describe('postTask', () =>{
    it('should return an array of tasks', async () => {
      const resolvedValue = {
        id: 1,
        description: 'learn backend',
        isComplete: false
      };

      jest.spyOn(Task, 'create').mockResolvedValue(resolvedValue);

      const mockDescription = 'learn backend';

      const returnedValue = await taskServices.postTask(mockDescription);

      expect(returnedValue).toEqual(resolvedValue);
    });
  });

  describe('putTask', () =>{
    it('should update the task with the given information', async () => {
      const resolvedValue = 'Task updated successfully';

      jest.spyOn(Task, 'update').mockResolvedValue(resolvedValue);

      const mockTask = {
        id: 1,
        description: 'learn backend',
        isComplete: false
      };

      const returnedValue = await taskServices.putTask(mockTask);

      expect(returnedValue).toEqual(resolvedValue);
    });

    it('should throw an error if the task does not exist', async () => {
      const resoledValue = [0];

      jest.spyOn(Task, 'update').mockResolvedValue(resoledValue);

      const mockTask = {
        id: 123,
        description: 'learn backend',
        isComplete: false
      };

      await expect(taskServices.putTask(mockTask)).rejects.toThrow('Task not found');
    });
  });

  describe('patchTask', () =>{
    it('should update the task with the given information', async () => {
      const resolvedValue = 'Task updated successfully';

      jest.spyOn(Task, 'update').mockResolvedValue(resolvedValue);

      const mockId = 1;

      const mockTask = {
        description: 'learn backend',
        isComplete: false
      };

      const returnedValue = await taskServices.patchTask(mockId, mockTask);

      expect(returnedValue).toEqual(resolvedValue);
    });

    it('should throw an error if the task does not exist', async () => {
      const resolvedValue = [0];

      jest.spyOn(Task, 'update').mockResolvedValue(resolvedValue);
      
      const mockId = 123;

      const mockTask = {
        description: 'learn backend',
        isComplete: false
      };

      await expect(taskServices.patchTask(mockId, mockTask)).rejects.toThrow('Task not found');
    });
  });

  describe('deleteTask', () =>{
    it('should delete the task with the given id', async () => {
      const resolvedValue = 'Task deleted successfully';

      jest.spyOn(Task, 'destroy').mockResolvedValue(resolvedValue);

      const mockId = 1;

      const returnedValue = await taskServices.deleteTask(mockId);

      expect(returnedValue).toEqual(resolvedValue);
    });

    it('should throw an error if the task does not exit', async () => {
      const resolvedValue = 0;

      jest.spyOn(Task, 'destroy').mockResolvedValue(resolvedValue);

      const mockId = 123;

      await expect(taskServices.deleteTask(mockId)).rejects.toThrow('Task not found');
    });
  });
});