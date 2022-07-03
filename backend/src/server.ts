import cors from 'cors'
import express from 'express'

import routes from './routes'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

const NODE_PORT = process.env.NODE_PORT || 3333

app.listen(NODE_PORT, () => {
  console.log(`HTTP server running on port ${NODE_PORT}`)
})
