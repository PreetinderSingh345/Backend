const Joi = require('Joi');

const getTaskSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .max(9999)
});

const postTaskSchema = Joi.object({
  description: Joi.string()
    .min(1)
    .max(150)
    .required()
});

const putTaskSchema = Joi.object({
  changedTask: Joi.object({
    id: Joi.number()
      .integer()
      .min(1)
      .max(9999)
      .required(),

    description: Joi.string()
      .min(1)
      .max(150),

    isComplete: Joi.boolean()
  }),
});

const patchTaskSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .max(9999),

  changedFields: Joi.alternatives().try(
    Joi.object({
      description: Joi.string()
        .min(1)
        .max(150)
        .required(),
  
      isComplete: Joi.boolean()
    }),

    Joi.object({
      description: Joi.string()
        .min(1)
        .max(150),

      isComplete: Joi.boolean()
        .required()
    })
  )
});

const deleteTaskSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .max(9999)
});

module.exports = { getTaskSchema, postTaskSchema, putTaskSchema, patchTaskSchema, deleteTaskSchema };