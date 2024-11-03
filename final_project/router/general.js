const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const getAllBooks=()=>{
  return books;
}

public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
      return res.status(400).json({ message: "Error registering user" });
    }
    if (isValid(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User registered" });
  
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  try{
    let allBooks = await getAllBooks();
    return res.status(200).send(JSON.stringify(allBooks,null,4));
  }catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  try{
    let isbn = parseInt(req.params.isbn);
    let book = await books[isbn];
    return res.status(200).send(JSON.stringify(book,null,4));
  }catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author.toLowerCase();
    // The books object is not an array, so we need to convert it to an array before we can filter it
    let targetBook = Object.values(books).filter((book) => book.author.toLowerCase() === author);
    if(targetBook.length > 0){
      return res.status(200).send(JSON.stringify(targetBook,null,4));
    }else{
      return res.status(404).json({message: "Book not found"});
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let title = decodeURIComponent(req.params.title).toLowerCase();
    let targetBook = Object.values(books).filter((book) => book.title.toLowerCase() === title);
    if(targetBook.length > 0){
      return res.status(200).send(JSON.stringify(targetBook,null,4))
    }else{
      return res.status(500).json({message: "Internal server error"});
    }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  try{
    let isbn = parseInt(req.params.isbn);
    let review = await books[isbn].reviews;
    return res.status(200).send(JSON.stringify(review,null,4));
  }catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
});

module.exports.general = public_users;
