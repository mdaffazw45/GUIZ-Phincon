const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password)
  return hashedPassword
}

const comparePassword = (password, hash) => {
  const matchPassword = bcrypt.compare(password, hash)
  return matchPassword
}

module.exports = {
  hashPassword,
  comparePassword
}