# Back-end API development
A backend model to provide a REST API that the front-end can access using HTTP network calls, in order to access the database. Development features middleware to handle the routing of requests to the right functions (and endpoints) and JSON Web Tokens within cookies to authenticate users for API access. Done with **Javascript**,  **MongoDB**, **Express**, and **Node.js**.

- CRUD operations
- Search Files
- Mongoose Schema
- bycrpt library
- JSON Web Tokens
- Cookies
- Tested via Postman

Express will be used for the middleware to create various CRUD endpoints, as well as make changes to the request and the response objects. Also, middleware functions can end the request-response cycle and then call the next middleware in the stack. Mongoose for managing data in MongoDB using various queries. More information on Mongoose below:

## Object Data Modeling in MongoDB
This application uses Mongoose, a MongoDB object modeling tool. With this, the user model is created out of the Schema interface, which defines the structure of the documents in the library collection.

## Getting Started
```
npm install
npm start
```

