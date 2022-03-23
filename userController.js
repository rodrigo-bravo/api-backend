const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * following functions:
 * create new user; logging-in user
 * @param {*} req 
 * @param {*} res 
 */
 exports.registerUser = (req, res)=> {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const request = userModel.create(req.body)
        res.status('200').json({ message: 'inserted' })    
    } catch(e) {
        res.status('200').json({ message: 'failed' })
    }
 }

 exports.login = async(req, res)=> {
    const user = await userModel.findOne({ 'username': req.body.username })  
    if (user != null) {
        // if user exists, check if pass equals unhashed pass inside collection
        results = bcrypt.compareSync(req.body.password, user.password)   
        if (results) {
            // if entered pass correct (matches), create json web token 
            // jwt.sign(payload, secret, expire claim)
            const token = jwt.sign({ _id: user._id, username: user.username }, 
                          config.secret, {expiresIn: "5 minutes"})      
            // if returns jwt as string, user login would send the jwt in a cookie to frontend 
            res.cookie('token', token)
            // return new user
            res.status(200).json(user)     
        } else {
            // if pass wrong, send false
            res.status(200).send(results)
        }
    } else if (user == null) {
        res.status(200).json(user)
    }
}


/**
 * function to validate json web token
 * @param {*} req 
 * @param {*} res 
 */
 exports.validateJWT = (req, res, next)=> {
    jwt.verify(req.cookies.token,config.secret,(err, data)=> {
        // data has decrypted _id passed to create jwt
        if(err) {
            res.cookies('token','')
        }
        next()
    })
}


/**
 * functions to get all users or a user via unique username
 * @param {*} req 
 * @param {*} res 
 */
 exports.getUsers = async(req, res)=> {
    const users = await userModel.find({})
    res.status(200).json(users)
 }

 exports.getUser = async(req, res)=> {
    const user = await userModel.find({username: req.params.username}) 
    res.status(200).json(user)
}


