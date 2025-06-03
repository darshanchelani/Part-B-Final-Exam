const express = require('express');
const ConnectDB = require('./DBConnection');
const BookAPI = require('./BookModel');
const app = express();
const port = 3000;
app.use(express.json());


ConnectDB();
app.get('/books', async (req, res) => {
    try {
        const books = await BookAPI.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await BookAPI.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.post('/books', async (req, res) => {
    const book = new BookAPI(req.body);
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.delete('/books/:id', async (req, res) => {
    try {
        const book = await BookAPI.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }    
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
