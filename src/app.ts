import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { personRoute } from './app/Modules/Person/person.route'
const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/', personRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
