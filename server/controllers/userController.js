const { User } = require('../models')
const { handleServerError, handleResponse } = require("../helper/responseHandler");
const { registerValidator, loginValidator } = require("../validators/user.validator");
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

// User Register
exports.register = async (req, res) => {
  try {
    const newData = req.body
    
    const { error, value } = registerValidator.validate(newData)
    if(error) {
      return handleResponse(res, 400, { message: error.details[0].message })
    }
    const { username, email, password } = value

    const emailExist = await User.findOne({ where: { email }})
    if(emailExist) {
      return handleResponse(res, 404, 'Email already exist')
    }

    const hashedPassword = hashPassword(password)
    const register = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    
    return handleResponse(res, 201, register)

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// User Login
exports.login = async (req, res) => {
  try {
    const newData = req.body
    
    const { error, value } = loginValidator.validate(newData)
    if(error) {
      return handleResponse(res, 400, { message: error.details[0].message })
    }
    const { email, password } = value

    const findUser = await User.findOne({ where: { email }})
    if(!findUser) {
      return handleResponse(res, 404, 'User with this email does not exist.')
    }

    const isPassword = await comparePassword(password, findUser.password)
    if(!isPassword) {
      return handleResponse(res, 404, 'Your password does correct.')
    }

    if(isPassword) {
      const accessToken = generateToken(findUser)

      return handleResponse(res, 200, {
        token: accessToken,
        message: 'Successfully Login Account.'
      })
    }

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}