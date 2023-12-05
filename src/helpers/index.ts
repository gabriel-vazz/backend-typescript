import bcrypt from 'bcrypt'

export const createHashedPassword = async(password: string) => {
  return bcrypt.hash(password, await bcrypt.genSalt(10))
}

export const compareHashedPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}