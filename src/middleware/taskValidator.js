const { getTaskSchema, postTaskSchema, putTaskSchema, patchTaskSchema, deleteTaskSchema } = require('../schemas/joiTask');
const HttpError = require('../utils/errors/HttpError');

const getTasksValidator = (req, res, next) => {
    try {
        const {id} = req.params;

        const {error} = getTaskSchema.validate({id: id});
    
        if(error) {
            throw new HttpError(400, error.details[0].message);
        }
    
        next();    
    } catch(err) {
        if(err instanceof HttpError) {
            res.status(err.statusCode).send(err.message);
        }else {
            res.status(500).send(error.message);
        }
    }
}

const postTaskValidator = (req, res, next) => {
    try {
        const { description } = req.body;
    
        const {error} = postTaskSchema.validate({description: description});
    
        if(error) {
          throw new HttpError(400, error.details[0].message);
        }
    
        next();
      } catch(error) {
        if(error instanceof HttpError) {
          res.status(error.statusCode).send(error.message);
        }else {
          res.status(500).send(error.message);
        }
      }
}

const putTaskValidator = (req, res, next) => {
    try {
        const changedTask = req.body;
    
        const {error} = putTaskSchema.validate({changedTask: changedTask});
      
        if(error) {
          throw new HttpError(400, error.details[0].message);
        }
    
        next();
      } catch (error) {
        if(error instanceof HttpError) {
          res.status(error.statusCode).send(error.message);
        }else {
          res.status(500).send(error.message);
        }
    }
}

const patchTaskValidator = (req, res, next) => {
    try {
        const { id } = req.params;
        const changedFields = req.body;
      
        const {error} = patchTaskSchema.validate({id: id, changedFields: changedFields});
      
        if(error) {
          throw new HttpError(400, error.details[0].message);
        }
      
        next();
      } catch(error) {
        if(error instanceof HttpError) {
          res.status(error.statusCode).send(error.message);
        }else {
          res.status(500).send(error.message);
        }
      }
}

const deleteTaskValidator = (req, res, next) => {
    try {
        const { id } = req.params;
    
        const {error} = deleteTaskSchema.validate({id: id});
      
        if(error) {
          throw new HttpError(400, error.details[0].message);
        }
      
        next();
      } catch(error) {
        if(error instanceof HttpError) {
          res.status(error.statusCode).send(error.message);
        }else {
          res.status(500).send(error.message);
        }
      }
}

module.exports = {getTasksValidator, postTaskValidator, putTaskValidator, patchTaskValidator, deleteTaskValidator};