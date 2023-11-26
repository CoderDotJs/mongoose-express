import { Request, Response } from 'express'
import { personServices } from './person.services'
import personValidationSchema from './person.validation'

const createNewPerson = async (req: Request, res: Response) => {
  try {
    const person = req.body.$project

    //data validation using joi
    const { error, value } = personValidationSchema.validate(person)
    //send data to db
    const result = await personServices.createAPerson(value)

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
    const result = await personServices.getAllPerson()
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
const getAPerson = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params?.userId
    const result = await personServices.getAPerson(userId)
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
const updateAUser = async (req: Request, res: Response) => {
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
const deleteAPerson = async (req: Request, res: Response) => {
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
const createAnOrder = async (req: Request, res: Response) => {
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
const getAllOrders = async (req: Request, res: Response) => {
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
const getTotalPrice = async (req: Request, res: Response) => {
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
  createNewPerson,
  getAllPerson,
  getAPerson,
  deleteAPerson,
  updateAUser,
  createAnOrder,
  getAllOrders,
  getTotalPrice,
}
