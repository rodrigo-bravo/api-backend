const u = require('../controller/userController')
const express = require('express')
const router = express.Router()

/**
 * register a user into the library bookkeeping system
 */
router.route('/library/users').post(u.registerUser)

/**
 * Dev tools of retrieving all users with their respective book lists
 */
router.route('/library/users').get(u.getUsers)
router.route('/library/users/:username').get(u.getUser)

// User login
router.route('/library/user').post(u.login)

// Exporting router
module.exports = router