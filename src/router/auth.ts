import { Router } from 'express'
const auth = Router()

import { register, login } from '../controllers/auth'

auth.post('/register', register)
auth.post('/login', login)

export default auth
