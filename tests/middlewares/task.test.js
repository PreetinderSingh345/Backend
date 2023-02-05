const {describe, it, expect} = require('@jest/globals');
const {getTasksValidator, postTaskValidator, putTaskValidator, patchTaskValidator, deleteTaskValidator} = require('../../src/middlewares/taskValidator');

describe('Task validation', () => {
  describe('getTasksValidator', () => {
    it('should valdiate get tasks request', async () => {
      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      await getTasksValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('postTaskValidator', () => {
    it('should valdiate post task request', async () => {
      const mockReq = {
        body: {
          description: 'learn backend'
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      await postTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('putTaskValidator', () => {
    it('should put task request', async () => {
      const mockReq = {
        body: {
          id: 1,
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      await putTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });  
  });

  describe('patchTaskValidator', () => {
    it('should patch task request', async () => {
      const mockReq = {
        params: {
          id: 1,
        },
        
        body: {
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      await patchTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('deleteTaskValidator', () => {
    it('should valdiate delete task request', async () => {
      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      await deleteTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });
});