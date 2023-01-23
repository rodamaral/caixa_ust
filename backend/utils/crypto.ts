import bcrypt from 'bcryptjs'

export const hashPassword = (plainPassword: string) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(plainPassword, salt)
}

export const comparePasswords = (plainPassword: string, hash: string) =>
  bcrypt.compareSync(plainPassword, hash)
