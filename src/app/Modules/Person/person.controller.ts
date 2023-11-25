import { Request, Response } from 'express'
import { personServices } from './person.services'
import personValidationSchema from './person.validation'

const createPerson = async (req: Request, res: Response) => {
  try {
    const person = req.body.$project

    //data validation using joi
    const { error, value } = personValidationSchema.validate(person)
    //send data to db
    const result = await personServices.createPersonFromDB(value)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Some went to be wrong',
        error: error.details,
      })
    }
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some went to be wrong',
      error: error,
    })
  }
}

const getAllPerson = async (req: Request, res: Response) => {
  try {
    const result = await personServices.getAllPersonFromDB()
    res.status(200).json({
      success: true,
      message: 'All User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Some went to be wrong',
      error: error,
    })
  }
}

const getSingleperson = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const result = await personServices.getSinglePersonFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const body = req.body
    const result = await personServices.updateUserById(userId, body)
    res.status(200).json({
      success: true,
      message: 'User updated!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}
const deletePerson = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await personServices.deletePersonFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const body = req.body
    const result = await personServices.creatOrder(userId, body)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}
const getOrders = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const result = await personServices.getOrders(userId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}
const totalSum = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const result = await personServices.totalSum(userId)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}

export const personController = {
  createPerson,
  getAllPerson,
  getSingleperson,
  deletePerson,
  updateUser,
  createOrder,
  getOrders,
  totalSum,
}
