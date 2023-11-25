import Joi from 'joi'

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})

const orderValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
})

const fullNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const personValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().default(true).required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressValidationSchema.required(),
  orders: Joi.array().items(orderValidationSchema),
  isDeleted: Joi.boolean,
})

export default personValidationSchema
