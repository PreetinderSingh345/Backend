const { describe, it, expect } = require('@jest/globals');
const taskServices = require('../../src/services/task');
const taskController = require('../../src/controllers/task');
const HttpError = require('../../src/utils/errors/HttpError');

describe('Task services', () => {
  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const resolvedValue = [{
        id: 1,
        description: 'learn backend',
        isComplete: false
      }];

      jest.spyOn(taskServices, 'getTasks').mockResolvedValue(resolvedValue);

      const mockReq = {};

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };

      await taskController.getTasks(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
    });
  });

  describe('getTask', () => {
    it('should return the task with the given id', async () => {
      const resolvedValue = {
        id: 1,
        description: 'learn backend',
        isComplete: false
      };

      jest.spyOn(taskServices, 'getTask').mockResolvedValue(resolvedValue);

      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };

      await taskController.getTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
    });

    it('should throw an error when the id does not exits', async () => {
      jest.spyOn(taskServices, 'getTask').mockImplementation(() => {
        throw new HttpError(404, 'Task not found');
      });

      const mockReq = {
        params: {
          id: 1
        }
      };
      
      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      }

      await taskController.getTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.status().send).toHaveBeenCalledWith('Task not found');
    });

    it('should throw an error when there is an unexpected error', async () => {
      jest.spyOn(taskServices, 'getTask').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };

      await taskController.getTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
    });
  });

  describe('postTask', () => {
    it('should post the task with the given description', async () => {
      const resolvedValue = {
        id: 1,
        desription: 'learn backend',
        isComplete: false
      };

      jest.spyOn(taskServices, 'postTask').mockResolvedValue(resolvedValue);

      const mockReq = {
        body: {
          description: 'learn backend'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({json: jest.fn()})
      };

      await taskController.postTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
    });
  });

  describe('putTask', () => {
    it('should update the task with the given information', async () => {
      const resolvedValue = 'Task updated successfully';

      jest.spyOn(taskServices, 'putTask').mockResolvedValue(resolvedValue);

      const mockReq = {
        body: {
          id: 1,
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      await taskController.putTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().send).toHaveBeenCalledWith(resolvedValue);
    });
  });

  describe('patchTask', () => {
    it('should update the task with the given information', async () => {
      const resolvedValue = 'Task updated successfully';

      jest.spyOn(taskServices, 'patchTask').mockResolvedValue(resolvedValue);

      const mockReq = {
        params: {
          id: 1,
        },

        body: {
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      await taskController.patchTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().send).toHaveBeenCalledWith(resolvedValue);
    });
  });

  describe('deleteTask', () => {
    it('should delete the task with the given id ', async ()=> {
      const resolvedValue = 'Task deleted successfully';

      jest.spyOn(taskServices, 'deleteTask').mockResolvedValue(resolvedValue);

      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      await taskController.deleteTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().send).toHaveBeenCalledWith(resolvedValue);
    });
  });
});