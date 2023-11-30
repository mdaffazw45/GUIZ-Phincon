const express = require('express')
const { getUser, getUserById, getUserByUsername, deleteUser, changePassword, updateProfile } = require('../controllers/userController')
const { authentication, authorization } = require('../middlewares/auth');
const upload = require('../middlewares/multer')
const router = express.Router()

router.use(authentication);
router.get('/all', authorization, getUser)
router.get('/', getUserById)
router.get('/by/:username', getUserByUsername)
router.put('/change-password', changePassword)
router.put('/profile', upload.single('avatar'), updateProfile)
router.delete('/delete/:userId', authorization, deleteUser)

module.exports = router