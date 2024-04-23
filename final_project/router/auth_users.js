const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const userMatches = users.filter((user) => user.username === username);
console.log("userMatches ", userMatches)
if(userMatches != null){
    return true
} else {
    return false
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

    const resultsss = users.filter((user) => user.username === username && user.password === password);
    if(resultsss != null){
        return true
    } else {
        return false
    }

}

//Task 7
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

    if (authenticatedUser(req.body.username,req.body.password) == false) {
        return res.status(404).json({message: "wrong username/password"});
    }

    let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }

  return res.status(300).json({message: "User successfully logged in"});
});

//Task 8
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;
  if (books[isbn]) {
    let book = books[isbn];
    book.reviews[username] = review;
    return res.status(300).json({message: "Review successfully posted"});
  }
});

//  Task 9
//  Delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    if (books[isbn]) {
      let book = books[isbn];
      delete book.reviews[username];
      return res.status(300).send("Review successfully deleted");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
