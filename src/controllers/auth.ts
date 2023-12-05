import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { createHashedPassword, compareHashedPassword } from '../helpers/index'

//REGISTER CONTROLLER
export const register = async(req: Request, res: Response) => {
  const { name, email, password } = req.body
  
  if(!name || !email || !password) {
    return res.sendStatus(400)
  }

  const userExists = await getUserByEmail(email)
  if(userExists) {
    return res.sendStatus(400)
  }

  const hash = await createHashedPassword(password)

  const user = await createUser({ name, email, password: hash })
  return res.status(201).json(user)
}

//LOGIN CONTROLLER
export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await getUserByEmail(email).select('+password')
  if(!user) {
    return res.sendStatus(400)
  }

  const auth = await compareHashedPassword(password, user.password)
  if(!auth) {
    return res.sendStatus(403)
  }
  
  return res.status(200).json(user)
}