// Imports
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const booksRouter = require('./routes/booksRoutes')
const userRouter = require('./routes/userRoutes')
const cors = require('cors')

// Configuration
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Application/JSON')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    next() 
})
app.use(booksRouter)
app.use(userRouter)


// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/library', ()=>{
    console.log('Database is connected.')
})

// Server listening on port 3000
app.listen(3000, ()=>{
    console.log('listening on http://localhost:3000')
})

