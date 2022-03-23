const u = require('../controller/userController')
const b = require('../controller/booksController')
const express = require('express')
const router = express.Router()

/**
 * Routes: linking to following functions:
 * get all books created by user; add a  book to user;
 * get book by date created; get favorited created books to lists
 * of the user; get n (3 in this instance) most recents (if available) 
 * books created by date; get book checked out by user by a
 * specific identifier (book _id); update and delete a book to change items
 * such as user review/rating or other components.
 */
router.route('/library/:username/books').get(u.validateJWT, b.getBooks).post(u.validateJWT, b.addBook)
//router.route('/library/:username/books').get(b.getBooks).post(b.addBook)
router.route('/library/:username/books/date/:dateCreated').get(u.validateJWT, b.getBookByDateCreated)
//router.route('/library/:username/books/date/:dateCreated').get(b.getBookByDateCreated)
router.route('/library/:username/books/favorites').get(u.validateJWT, b.getFavorites)
//router.route('/library/:username/books/favorites').get(b.getFavorites)
router.route('/library/:username/books/recents').get(u.validateJWT, b.getRecents)
//router.route('/library/:username/books/recents').get(b.getRecents)
router.route('/library/:username/books/:_id').get(u.validateJWT, b.getBook).patch(u.validateJWT, b.editBook).delete(u.validateJWT, b.deleteBook)
//router.route('/library/:username/books/:_id').get(b.getBook).patch(b.editBook).delete(b.deleteBook)

// Exporting router
module.exports = router