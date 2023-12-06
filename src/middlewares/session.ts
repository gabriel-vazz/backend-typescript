import session from 'express-session'
import { Request, Response, NextFunction } from 'express'

declare module 'express-session' {
  interface SessionData {
    user: { name: string, email: string }
  }
}

export const sessionConfig = () => {
  return session({
    secret: 'paranoid_android',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  })
}

export const isAuthenticated = async(
  req: Request, res: Response, next: NextFunction
) => {
  if(req.session.user) {
    next()
  } else {
    res.sendStatus(403)
  }
}