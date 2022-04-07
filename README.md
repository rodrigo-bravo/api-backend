# Backend Application
A backend model for a user directory which uses JWT to authenticate users using **Javascript**,  **MongoDB**, **Express**, and **Node.js**. In context, this model allows users to store, search, add, edit, filter, and delete book descriptions.
- CRUD operations
- Search Files
- Mongoose Schema
- bycrpt library
- JSON Web Tokens
- Tested via Postman

Express will be used for the middleware to create various CRUD endpoints, as well as make changes to the request and the response objects. Also, middleware functions can end the request-response cycle and then call the next middleware in the stack. Mongoose for managing data in MongoDB using various queries. More information on Mongoose below:

## Object Data Modeling in MongoDB
This application uses Mongoose, a MongoDB object modeling tool. With this, the user model is created out of the Schema interface, which defines the structure of the documents in the library collection.

## Getting Started
```
npm install
npm start
```

