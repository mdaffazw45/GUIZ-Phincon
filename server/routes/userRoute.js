const express = require('express')
const { getUser, getUserById, deleteUser } = require('../controllers/userController')
const { authentication, authorization } = require('../middlewares/auth');
const router = express.Router()

router.use(authentication);
router.get('/all', authorization, getUser)
router.get('/', getUserById)
router.delete('/delete/:userId', authorization, deleteUser)

module.exports = router