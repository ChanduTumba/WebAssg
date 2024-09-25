import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, 'books');
      const booksSnapshot = await getDocs(booksRef);
      setBooks(booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Available Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">{book.bookName}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <Link
              to={`/books/${book.id}`}
              className="bg-blue-500 text-white py-2 px-4 mt-4 inline-block rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
