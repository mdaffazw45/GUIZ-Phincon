const {
  handleServerError,
  handleResponse,
} = require('../helper/responseHandler');
const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return handleResponse(res, 400, { error: 'User Unauthentication' });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return handleResponse(res, 400, { error: 'Token is Invalid' });
    }

    const { id, role } = decoded;
    const foundUser = await User.findByPk(id);
    if (!foundUser) {
      return handleResponse(res, 400, { error: 'User tidak tersedia' });
    } else {
      req.user = { id, role };
      next();
    }
  } catch (err) {
    handleServerError(res);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return handleResponse(res, 403, {
        error: 'Access Forbidden. Admin Authorization Required',
      });
    }

    if (!role) {
      return handleResponse(res, 403, { error: 'Your Role does not match' });
    }

    next();
  } catch (err) {
    handleServerError(res);
  }
};

module.exports = {
  authentication,
  authorization,
};
