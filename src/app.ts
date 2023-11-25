import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { personRoute } from './app/Modules/Person/person.route'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application route
app.use('/', personRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
