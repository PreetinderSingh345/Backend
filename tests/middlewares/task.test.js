const {describe, it, expect} = require('@jest/globals');
const {getTaskValidator, postTaskValidator, putTaskValidator, patchTaskValidator, deleteTaskValidator} = require('../../src/middlewares/taskValidator');
const { getTaskSchema, postTaskSchema, putTaskSchema, patchTaskSchema, deleteTaskSchema } = require('../../src/schemas/joiTask');

describe('Task validation', () => {
  describe('getTaskValidator', () => {
    it('should valdiate get tasks request', async () => {
      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {};

      const mockNext = jest.fn();

      getTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should throw a 400 error when the id is not a number', async () => {
      jest.spyOn(getTaskSchema, 'validate').mockReturnValue({
        error: {
          details: [{
            message: '"id" must be a number'
          }]
        }
      });

      const mockReq = {
        params: {
          id: 'abc'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };

      const mockNext = jest.fn();

      getTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().send).toHaveBeenCalledWith('"id" must be a number');
    });

    it('should throw a 500 error when there is an unexpected error', async () => {
      jest.spyOn(getTaskSchema, 'validate').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      const mockNext = jest.fn();

      getTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
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

      postTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should throw an error when the description is not a string', async () => {
      jest.spyOn(postTaskSchema, 'validate').mockReturnValue({
        error: {
          details: [{
            message: '"description" must be a string'
          }]
        }
      });

      const mockReq = {
        body: {
          description: 'learn backend'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      }

      const mockNext = jest.fn();

      postTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().send).toHaveBeenCalledWith('"description" must be a string');
    });

    it('should throw an error when there is an unexpected error', async () => {
      jest.spyOn(postTaskSchema, 'validate').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      const mockReq = {
        body: {
          description: 'learn backend'
        }
      }

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      }

      const mockNext = jest.fn();

      postTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
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

      putTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    }); 
    
    it('should throw an error when the id is not a number', async () => {
      jest.spyOn(putTaskSchema, 'validate').mockReturnValue({
        error: {
          details: [{
            message: '"id" must be a number'
          }]
        }
      });

      const mockReq = {
        body: {
          id: 'abc',
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      const mockNext = jest.fn();

      putTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().send).toHaveBeenCalledWith('"id" must be a number');
    });

    it('should throw an error when there is an unexpected error', async () => {
      jest.spyOn(putTaskSchema, 'validate').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

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

      const mockNext = jest.fn();

      putTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
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

      patchTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should throw an error when the id is not a number', async () => {
      jest.spyOn(patchTaskSchema, 'validate').mockReturnValue({
        error: {
          details: [{
            message: '"id" must be a number'
          }]
        }
      });

      const mockReq = {
        params: {
          id: 'abc',
        },

        body: {
          description: 'learn backend',
          isComplete: false
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      }

      const mockNext = jest.fn();

      patchTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().send).toHaveBeenCalledWith('"id" must be a number');
    });

    it('should throw an error when there is an unexpected error', async () => {
      jest.spyOn(patchTaskSchema, 'validate').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

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

      const mockNext = jest.fn();

      patchTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
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

      deleteTaskValidator(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should throw a 400 error when the id is not a number', async () => {
      jest.spyOn(deleteTaskSchema, 'validate').mockReturnValue({
        error: {
          details: [{
            message: '"id" must be a number'
          }]
        }
      });

      const mockReq = {
        params: {
          id: 'abc'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ send: jest.fn() })
      };

      const mockNext = jest.fn();

      deleteTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.status().send).toHaveBeenCalledWith('"id" must be a number');
    });

    it('should throw a 500 error when there is an unexpected error', async () => {
      jest.spyOn(deleteTaskSchema, 'validate').mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      const mockReq = {
        params: {
          id: 1
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({send: jest.fn()})
      };

      const mockNext = jest.fn();

      deleteTaskValidator(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.status().send).toHaveBeenCalledWith('Something went wrong');
    });
  });
});