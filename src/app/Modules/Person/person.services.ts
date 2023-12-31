import { TOrder, TPerson } from './person.interface'
import { Person } from './person.model'

const createAPerson = async (person: TPerson) => {
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
const getAllPerson = async () => {
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
const getAPerson = async (userId: string) => {
  const isExists = await Person.isExists(userId)
  return isExists
}
const updateAnUser = async (userId: string, body: TPerson) => {
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
const deleteUser = async (id: string) => {
  const result: TPerson = await Person.findOneAndUpdate(
    { userId: id },
    { isDeleted: true },
  ).select('isDeleted')
  if (result.isDeleted) {
    return null
  }
  return result
}
const createOrder = async (userId: string, body: TOrder) => {
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const find: any = await Person.findOne({
      userId,
    }).select('_id')
    //match not working with userId so i had to find the _id first and then use the aggregate to calculate the total price
    const res = await Person.aggregate([
      {
        $match: {
          _id: {
            $in: [find?._id],
          },
        },
      },
      {
        $unwind: '$orders',
      },
      {
        $project: {
          orders: 1,
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
  createAPerson,
  getAllPerson,
  getAPerson,
  deleteUser,
  updateAnUser,
  createOrder,
  getOrders,
  totalSum,
}
