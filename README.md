# Book Review
## Project Overview
In this project, you will assume the role of a back-end developer working for an online retailer selling books. The goal is to develop a server-side application that stores, retrieves, and manages book ratings and reviews. The application provides essential features to allow users to access a variety of book-related functionalities.
## Feature
<ul>
    <li>Retrieve a list of all books available in the bookshop.</li>
    <li>Search for specific books using their ISBN code, author names, and titles.</li>
    <li>Retrieve reviews and comments for specified books.</li>
    <li>Register as a new user of the application.</li>
    <li>Login to the application.</li>
    <li>Add a new review for a book (logged-in users only).</li>
    <li>Modify a book review (logged-in users can modify only their own reviews).</li>
    <li>Delete a book review (logged-in users can delete only their own reviews).</li>
    <li>Support for multiple users accessing the application simultaneously.</li>
</ul>

## API Endpoints
### General API

1. **GET** `/` - This endpoint retrieves all books in the storage.
2. **GET** `/isbn/:isbn` - This endpoint allows users to search for a specific book by its ISBN code. It returns detailed information about the book, including its title, author, and other relevant details.
3. **GET** `/author/:author` - This endpoint retrieves all books by a specified author. Users can find all titles associated with an author's name, enhancing the search functionality.
4. **GET** `/title/:title` - This endpoint allows users to search for a specific book by its title. It returns details of the matching book, accommodating special characters and case insensitivity.
5. **GET** `/review/:isbn` - This endpoint retrieves all reviews and comments for a specified book identified by its ISBN. Users can view the ratings and comments left by other users.

### Authenticated User API

1. **POST** `/register` - This endpoint allows new users to register for the application. Users provide necessary information to create an account, including username and password.
2. **POST** `/customer/login` - This endpoint authenticates users based on their credentials. Upon successful login, a session or JWT token is generated for subsequent requests, ensuring secure access to restricted functionalities.
3. **PUT** `/customer/auth/review/:isbn` - This endpoint enables logged-in users to add a new review for a book specified by its ISBN. Users must be authenticated to perform this action, ensuring that only authorized reviews are submitted.
4. **DELETE** `/customer/auth/review/:isbn` - This endpoint allows logged-in users to delete their own reviews for a book identified by its ISBN. It ensures that users can manage their contributions while maintaining review integrity.

## Implementation Details
The server-side application is built using Node.js and Express.js. It serves as a RESTful web service, allowing seamless communication with a client-side application developed by another team member. The application supports session and JWT authentication to restrict certain operations to logged-in users.
