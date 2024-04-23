const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let number = req.params.isbn
  let result = books[number]
  return res.status(300).json({message: result});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    let authorData
    for (let key in books) {
        if (books.hasOwnProperty(key)) {
             if (books[key].author === req.params.author) {
                authorData = books[key]
            }
        }
    }

  return res.status(300).json({message: authorData});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let titleData
    for (let key in books) {
        if (books.hasOwnProperty(key)) {
             if (books[key].title === req.params.title) {
                titleData = books[key]
            }
        }
    }
  return res.status(300).json({message: titleData});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let number = req.params.isbn
  let result = books[number]
  return res.status(300).json({message: result.reviews});
});

module.exports.general = public_users;
