import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const bookRef = doc(db, 'books', bookId);
      const bookSnapshot = await getDoc(bookRef);
      if (bookSnapshot.exists()) {
        const bookData = bookSnapshot.data();
        setBook(bookData);

        // Fetch cover image URL
        if (bookData.coverImage) {
          const coverImageRef = ref(storage, bookData.coverImage);
          const coverImageUrl = await getDownloadURL(coverImageRef);
          setCoverImageUrl(coverImageUrl);
        }
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <img src={coverImageUrl} alt={book.bookName} className="w-full h-96 object-contain rounded mb-6" />
        <h1 className="text-4xl font-bold mb-4">{book.bookName}</h1>
        <p className="text-lg text-gray-700 mb-4">Author: {book.author}</p>
        <p className="text-xl text-gray-800 font-bold mb-4">Price: ${book.price}</p>
        <p className="text-gray-600 mb-6">Tags: {book.tags.join(', ')}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          onClick={() => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ ...book, coverImageUrl });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${book.bookName} added to cart!`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
