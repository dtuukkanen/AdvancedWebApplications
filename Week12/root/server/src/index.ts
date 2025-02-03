import { Request, Response, Router } from 'express';
import { Book, IBook } from './models/Book';

// Create Express router
const router = Router();

// Route for adding book
router.post("/api/book", async (req: Request, res: Response) => {
    try {
        // Log the request
        console.log("Post request for adding book received");

        // Read the request body
        const { name, author, pages } = req.body;
    
        // Create a new book
        const book: IBook = new Book({ name, author, pages });
        console.log("New book created");
        
        // Save the book
        await book.save();
        console.log("Book saved");
    
        return void res.status(200).json({ message: "ok" });
    } catch (error : any) {
        return void res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
