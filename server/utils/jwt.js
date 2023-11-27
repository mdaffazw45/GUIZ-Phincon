const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateToken = (user, expiresIn='1d') => {
  const { id, role } = user
  return jwt.sign({ id, role }, secretKey, { expiresIn })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (err) {
    return null
  }
}

module.exports = {
  generateToken,
  verifyToken
}