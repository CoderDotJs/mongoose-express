//All busness logic in here

import { TOrder, TPerson } from './person.interface'
import { Person } from './person.model'

const createPersonFromDB = async (person: TPerson) => {
  const result = await Person.create(person)
  return {
    userId: result.userId,
    username: result.username,
    fullName: {
      firstName: result.fullName.firstName,
      lastName: result.fullName.lastName,
    },
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: {
      street: result.address.street,
      city: result.address.city,
      country: result.address.country,
    },
  }
}

const getAllPersonFromDB = async () => {
  const result = await Person.aggregate([
    //stage-1
    {
      $project: {
        _id: 0,
        userId: 0,
        password: 0,
        isActive: 0,
        hobbies: 0,
        isDeleted: 0,
        orders: 0,
        fullName: {
          _id: 0,
        },
        address: {
          _id: 0,
        },
        __v: 0,
      },
    },
  ])
  return result
}

const getSinglePersonFromDB = async (userId: string) => {
  const isExists = await Person.isExists(userId)
  return isExists
}
const updateUserById = async (userId: string, body: TPerson) => {
  const isExists = await Person.isExists(userId)
  if (isExists) {
    const res = await Person.findOneAndUpdate(
      { userId },
      { ...body },
      { new: true },
    ).select(
      '-_id -__v -password -orders -isDeleted -fullName._id -address._id',
    )
    return res
  }
}

const deletePersonFromDB = async (id: string) => {
  const result: TPerson = await Person.findOneAndUpdate(
    { userId: id },
    { isDeleted: true },
  ).select('isDeleted')
  if (result.isDeleted) {
    return null
  }
  return result
}

const creatOrder = async (userId: string, body: TOrder) => {
  const isExists = await Person.isExists(userId)
  if (isExists) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const res = await Person.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          orders: body,
        },
      },
    ).select('orders')
    return null
  }
}
const getOrders = async (userId: string) => {
  const isExists = await Person.isExists(userId)
  if (isExists) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const res = await Person.findOne({ userId }).select(
      '-orders._id -_id -userName -age -address -isDeleted -isActive -fullName -username -userId -password -email -hobbies -__v',
    )
    return res
  }
}
const totalSum = async (userId: string) => {
  const isExists = await Person.isExists(userId)
  if (isExists) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const find: { _id: string | null } = await Person.findOne({
      userId,
    }).select('_id')
    const res = await Person.aggregate([
      {
        $match: {
          _id: {
            $in: [find._id],
          },
        },
      },
      {
        $unwind: '$orders',
      },
      {
        $project: {
          orders: 1,
          // _id: 1,
          // userId: 1,
          total: {
            $multiply: ['$orders.quantity', '$orders.price'],
          },
        },
      },
      {
        $group: {
          _id: '$orders.price',
          totalPrice: {
            $sum: { $sum: '$total' },
          },
        },
      },
      {
        $group: {
          _id: '$_id._id',
          totalPrice: {
            $sum: { $sum: '$totalPrice' },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ])
    return res
  }
}

export const personServices = {
  createPersonFromDB,
  getAllPersonFromDB,
  getSinglePersonFromDB,
  deletePersonFromDB,
  updateUserById,
  creatOrder,
  getOrders,
  totalSum,
}
