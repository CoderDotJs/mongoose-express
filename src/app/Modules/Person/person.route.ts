import express from 'express'
import { personController } from './person.controller'
const router = express.Router()

router.post('/api/users', personController.createNewPerson)
router.get('/api/users', personController.getAllPerson)
router.get('/api/users/:userId', personController.getAPerson)
router.put('/api/users/:userId', personController.updateAUser)
router.delete('/api/users/:userId', personController.deleteAPerson)
router.put('/api/users/:userId/orders', personController.createAnOrder)
router.get('/api/users/:userId/orders', personController.getAllOrders)
router.get(
  '/api/users/:userId/orders/total-price',
  personController.getTotalPrice,
)

export const personRoute = router
