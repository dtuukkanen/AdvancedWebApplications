import mongoose, { Schema, Document } from "mongoose";

// Define the Book interface
interface IBook extends Document {
    name: string;
    author: string;
    pages: number;
}

// Define the Book schema
const BookSchema: Schema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true }
});

// Define the Book model
const Book = mongoose.model<IBook>("Book", BookSchema);

// Export the Book model
export { Book, IBook };
