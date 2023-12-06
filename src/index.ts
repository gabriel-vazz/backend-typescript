import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
mongoose.connect('mongodb://localhost:27017/')

import { sessionConfig } from './middlewares/session'

import auth from './router/auth'

app.use(express.json())
app.use(cors())
app.use(sessionConfig())

app.use('/auth', auth)

app.listen(3000, () => console.log('http://localhost:3000/'))