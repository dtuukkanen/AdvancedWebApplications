import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import PageNotFound from "./PageNotFound";

interface IBook {
    name: string;
    author: string;
    pages: number;
}

const Book = () => {
    const { name } = useParams();
    const [book, setBook] = useState<IBook | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        // Fetch book data from backend API
        if (name) {
            fetch(`/api/book/${encodeURIComponent(name)}`)
        .then((res) => {
            if (res.status === 404) {
                throw new Error("Book not found");
            } else if (!res.ok) {
                throw new Error("Failed to fetch book");
            }
            return res.json();
        })
        .then((data: IBook) => {
            setBook(data);
        })
        .catch((err) => {
            console.error("Error fetching book:", err);
            setError(true);
        });
        }
    }, [name]);

    // If the book is not found, display a 404 page
    if (error) {
        return <PageNotFound />;
    }

    // If the book is still loading, display a loading message
    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <p>Name: {book.name}</p>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
        </div>
    );
};

export default Book
