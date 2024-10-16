/**
 * Midterm API Project - COMP229 Winter 2024
 * 
 * Challenge: Implement the API logic for managing a collection of books!
 * 
 * Here's the deal:
 * You have a server running on port 8080, and an array of books.
 * Your mission, should you choose to accept it, is to implement the missing logic
 * for each of the following API endpoints. 
 * 
 * Endpoints:
 * 1. GET /api/items       - Retrieve the full list of books.
 * 2. GET /api/items/search?title=[partial title name] - Retrieve books by a partial title match.
 * 3. GET /api/items/:id   - Retrieve a book by its index.
 * 4. POST /api/items      - Add a new book to the collection.
 * 5. PUT /api/items/:id   - Update a book by its index.
 * 6. DELETE /api/items/:id - Remove a book from the collection by its index.
 * 
 * The array of books is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman or Thunder Client.
 * 
 * Submission Requirements:
 * 1. **Screenshots**: Provide screenshots of your API tests, clearly showing:
 *    - There should be 1 screenshot per Endpoint (6 in total)
 *    - The API request.
 *    - The request body (where applicable).
 *    - The successful response.
 *    Use Postman, Thunder Client, or another similar API testing tool.
 * 
 * 2. **Code Submission**: 
 *    - Include your code in a **.zip** file.
 *    - Provide a GitHub link to your repository containing the project.
 *    - Make sure all screenshots are clearly visible in your submission.
 * 
 * Good luck, and may your code be bug-free!
 */

//Student Name: Yash Patel
//Student ID: 301089593

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/items
// Description: Get all items (books)
// Task: Implement logic to return the full list of books
app.get('/api/items', (req, res) => {
  res.json(books);
});

// GET /api/items?title=[<<partial title name>>]
// Description: Search for books by partial title match
// Task: Implement logic to return books matching the partial title
app.get('/api/items/search', (req, res) => {

  //get params and convert lowercase
  const title = req.query.title.toLowerCase();
  //filter book titles
  const matchingItems = books.filter(books => books.toLowerCase().includes(title));

  res.json(matchingItems);

});

// GET /api/items/:id
// Description: Get a specific item by ID
// Task: Implement logic to return a book by its index (ID)
app.get('/api/items/:id', (req, res) => {
// Get book id from params
    const id = parseInt(req.params.id); 
    
    //get the book from index
    if (id >= 0 && id < books.length) {
      res.json(books[id]);  // Return the book if the index is valid
    } else {
      res.status(404).json({ error: 'Book not found' });  // Return 404 if the index is invalid
    }
  });


// POST /api/items
// Description: Add a new item
// Task: Implement logic to add a new book to the array
  app.post('/api/items', (req, res) => {
     // Get new book title from request body
    const newBook = req.body.title; 

    // Add new book to the array
    if (newBook && newBook.trim()) {
      books.push(newBook);  
      res.status(201).json({ message: 'Book added', book: newBook });  
    } else {
      res.status(400).json({ error: 'Invalid book title' });  
    }
  });
  

// PUT /api/items/:id
// Description: Update an item by ID
// Task: Implement logic to update a book by its index (ID)
app.put('/api/items/:id', (req, res) => {
  // Get book index from URL params
    const id = parseInt(req.params.id);  

    // Get updated book title from request body
    const updatedBook = req.body.title;  

    //update the title using index(id)
    if (id >= 0 && id < books.length && updatedBook && updatedBook.trim()) {
      books[id] = updatedBook;  
      res.json({ message: 'Book updated', book: updatedBook });  
    } else {
      res.status(400).json({ error: 'Invalid request' });  
    }
  });


// DELETE /api/items/:id
// Description: Remove an item by ID
// Task: Implement logic to remove a book by its index (ID)
  app.delete('/api/items/:id', (req, res) => {
    // Get book id from params
    const id = parseInt(req.params.id); 

    if (id >= 0 && id < books.length) {
      const removedBook = books.splice(id, 1);  
      res.json({ message: 'Book deleted', book: removedBook[0] });  
    } else {
      res.status(404).json({ error: 'Book not found' }); 
    }
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
