const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  let isDup = users.filter((user) => {
    return user.username === username;
  });
  if (isDup.length > 0) {
    return true;
  } else {
    return false;
  }
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let isAvailable = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (isAvailable.length > 0) {
    return true;
  } else {
    return false;
  }
};
//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({ message: "Error logging in" });
  }
  // Generate JWT access token
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let user = req.session.authorization.username;
  let isbn = req.params.isbn;
  let review = req.body.review;
  if(!review){
    return res.status(400).json({message: "Review cannot be empty"});
  }else if(!books[isbn]){
    return res.status(404).json({message: "Book not found"});
  }else{
    books[isbn].reviews[user]=review;
    return res.status(200).json({message: "Review added successfully"});
  }
  // return res.status(300).json({ message: "Yet to be implemented" });
});
regd_users.delete("/auth/review/:isbn",(req,res)=>{
  let user = req.session.authorization.username;
  let isbn = req.params.isbn;
  if(!books[isbn]){
    return res.status(404).json({message: "Book not found"});
  }else if(!books[isbn].reviews[user]){
    return res.status(404).json({message: "Review not found"});
  }else{
    delete books[isbn].reviews[user];
    return res.status(200).json({message: "Review deleted successfully"});
  }
})
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
