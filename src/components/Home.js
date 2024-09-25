import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch the cover images from Firebase Storage for each book
      const booksWithImages = await Promise.all(
        booksList.map(async (book) => {
          if (book.coverImage) {
            const coverImageRef = ref(storage, book.coverImage);
            const coverImageUrl = await getDownloadURL(coverImageRef);
            return { ...book, coverImageUrl };
          }
          return book;
        })
      );

      setBooks(booksWithImages);
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    filter ? book.tags.includes(filter) : true
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Book Store</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by genre:</label>
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Novel">Novel</option>
          <option value="Drama">Drama</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={book.coverImageUrl} alt={book.bookName} className="w-full h-64 object-contain rounded mb-4" />
            <h3 className="text-xl font-bold">{book.bookName}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-gray-800 font-bold">${book.price}</p>
            <Link to={`/books/${book.id}`} className="bg-blue-500 text-white py-2 px-4 mt-4 block text-center rounded hover:bg-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
