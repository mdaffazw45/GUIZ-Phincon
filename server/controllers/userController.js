const { User } = require('../models');
const {
  handleServerError,
  handleResponse,
} = require('../helper/responseHandler');
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
} = require('../validators/userValidator');
const { Op, Sequelize } = require('sequelize');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const fs = require('fs');
const path = require('path');
const { generateToken } = require('../utils/jwt');
const { sendForgotPasswordEmail } = require('../utils/nodemailer');

// User Register
exports.register = async (req, res) => {
  try {
    const newData = req.body;

    const { error, value } = registerValidator.validate(newData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { username, email, password } = value;

    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return handleResponse(res, 404, { message: 'Email already exist' });
    }

    const hashedPassword = hashPassword(password);
    const register = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return handleResponse(res, 201, register);
  } catch (err) {
    handleServerError(res);
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const newData = req.body;

    const { error, value } = loginValidator.validate(newData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { email, password } = value;

    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return handleResponse(res, 404, {
        message: 'User with this email does not exist.',
      });
    }

    const isPassword = await comparePassword(password, findUser.password);
    if (!isPassword) {
      return handleResponse(res, 404, {
        message: 'Email or Password is incorrect.',
      });
    }

    if (isPassword) {
      const role = findUser.role;

      return handleResponse(res, 200, {
        role,
        token: generateToken(findUser),
        message: 'Successfully Login Account.',
      });
    }
  } catch (err) {
    handleServerError(res);
  }
};

// PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const newData = req.body;

    const { error, value } = forgotPasswordValidator.validate(newData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { email } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return handleResponse(res, 404, { message: 'Email not Registered' });
    }

    const temporaryPassword = 'secretpassteamguiz';
    const hashedPassword = hashPassword(temporaryPassword);

    await user.update({ password: hashedPassword });
    await sendForgotPasswordEmail(email, temporaryPassword);

    return handleResponse(res, 200, {
      message: 'Temporary password sent via email',
    });
  } catch (err) {
    handleServerError(res);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const { error, value } = changePasswordValidator.validate({
      currentPassword,
      newPassword,
    });
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const user = await User.findByPk(userId);
    const isPasswordMatch = await comparePassword(
      value.currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return handleResponse(res, 401, {
        message: 'Current password is incorrect',
      });
    }

    const newHashedPassword = hashPassword(value.newPassword);
    await user.update({ password: newHashedPassword });

    return handleResponse(res, 200, {
      message: 'Password changed successfully',
    });
  } catch (err) {
    handleServerError(res);
  }
};

// USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll({});
    return handleResponse(res, 200, user);
  } catch (err) {
    handleServerError(res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User Not Found' });
    }

    const { username, email, avatar } = user;

    return handleResponse(res, 200, {
      username,
      email,
      avatar,
    });
  } catch (err) {
    handleServerError(res);
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'avatar'],
    });
    if (!user) {
      return handleResponse(res, 404, { message: 'User Not Found' });
    }

    return handleResponse(res, 200, { user });
  } catch (err) {
    handleServerError(res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User Not Found' });
    }

    await user.destroy();

    return handleResponse(res, 200, {
      data: user,
      message: 'Successfully Deleted User',
    });
  } catch (err) {
    handleServerError(res);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;

    const { error, value } = updateProfileValidator.validate(profileData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { username, email } = value;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User Not Found' });
    }

    let avatarPath;
    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;

      if (user.avatar) {
        const oldAvatarPath = path.join(__dirname, '..', user.avatar);
        fs.unlink(oldAvatarPath, (err) => {
          if (err) {
            console.error('Failed to delete old avatar image: ', err);
          }
        });
      }
    }

    await User.update(
      {
        username,
        email,
        avatar: avatarPath || Sequelize.literal('avatar'),
      },
      { where: { id: userId } }
    );

    const updatedUser = await User.findOne({ where: { id: userId } });
    return handleResponse(res, 200, {
      message: 'Successfully Updated Profile',
      data: updatedUser,
    });
  } catch (err) {
    handleServerError(res);
  }
};
