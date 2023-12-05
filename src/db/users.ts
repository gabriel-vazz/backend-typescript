import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }
})

export const createUser = (userData: Record<string, unknown>) => {
  return UserModel.create(userData)
}

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email: email })
}

export const UserModel = model('users', UserSchema)