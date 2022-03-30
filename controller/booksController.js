const userModel = require('../model/userModel')

/**
 * function to get all books of a user
 * @param {*} req 
 * @param {*} res 
 */
 exports.getBooks = async(req, res)=> {
    const book = await userModel.find({username: req.params.username}).select('books')
        .then(function(result){
            var results = []          
            for(let i = 0; i < result[0].books.length; i++){
                results.push(result[0].books[i])
            }
            
            res.status(200).json(results)
        }
    )
}

/**
 * function to add a new book to a user
 * @param {*} req 
 * @param {*} res 
 */
 exports.addBook = async(req, res)=> {
    const book = await userModel.findOneAndUpdate({username: req.params.username},
        { $push: { "books": { "title": req.body.title,
                              "img": req.body.img,
                              "author": req.body.author,
                              "publisher": req.body.publisher,
                              "description": req.body.description,
                              "favorite": req.body.favorite,
                              "rating": req.body.rating,
                              "comments": req.body.comments }}})
    res.status(200).json({ message: "Added book" })
}

/**
 * function to get book by date created for user
 * @param {*} req 
 * @param {*} res 
 */
 exports.getBookByDateCreated = async(req, res)=> {
    const date = new Date(req.params.dateCreated)
    const startDate = new Date(date).setUTCHours(00,00,00)
    const endDate = new Date(date).setUTCHours(23,59,59)
    const book = await userModel.find({username: req.params.username}).select('books').then(function(result){
        var results = []      
        for(let i = 0; i < result[0].books.length; i++){
            var dateCreated = result[0].books[i].dateCreated         
            if(dateCreated >= startDate && dateCreated <= endDate){
                results.push(result[0].books[i])
            }
        }
        res.status(200).json(results)
    })
}

/**
 * function to get favorite books of user
 * @param {*} req 
 * @param {*} res 
 */
 exports.getFavorites = async(req, res)=> {
    const book = await userModel.find({username: req.params.username}).select('books')
        .then(function(result){
            var results = []              
            for(let i = 0; i < result[0].books.length; i++){
                if(result[0].books[i].favorite == true){
                    results.push(result[0].books[i])
                }
            }
            res.status(200).json(results)
    })
}

/**
 * function to get 3 most recent books (by date created) of user
 * @param {*} req 
 * @param {*} res 
 */
 exports.getRecents = async(req, res)=> {
    const book = await userModel.find({username: req.params.username}).select('books')
        .then(function(result){
            var results = []          
            for(let i = 0; i < result[0].books.length; i++){
                    results.push(result[0].books[i])
            }         
            results = results.sort((a,b)=> b.dateCreated - a.dateCreated)  
            const specificResults = []       
            // push the 3 most recent - can change to n most recent sorted by date created (dateCreated)
            specificResults.push(results[0], results[1], results[2])     
            res.status(200).json(specificResults)
        }
    )
}

/**
 * function to get, add, edit book of a user
 * @param {*} req 
 * @param {*} res 
 */
 exports.getBook = async(req, res)=> {
    const book = await userModel.find({username: req.params.username, 'books._id': req.params._id}, {'books.$': 1})
        .then(function(result) {
            res.status(200).json(result[0].books[0])
        }
    )
 }

 exports.editBook = async(req, res)=> {
    const book = await userModel.findOneAndUpdate({username: req.params.username, "books._id": req.params._id},
        { $set: { "books.$.title": req.body.title,
                  "books.$.img": req.body.img,
                  "books.$.author": req.body.author,
                  "books.$.publisher": req.body.publisher,
                  "books.$.description": req.body.description,
                  "books.$.favorite": req.body.favorite,
                  "books.$.rating": req.body.rating,
                  "books.$.comments": req.body.comments }})
    res.status(200).json({ message: "Edited book" })
 }

 exports.deleteBook = async(req, res)=> {
    const book = await userModel.findOneAndUpdate({username: req.params.username},
        { $pull: { "books": { "_id": req.params._id }}},
        { safe: true, multi: true })
    res.status(200).json({ message: "Deleted book" })
}
