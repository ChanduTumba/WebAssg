import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const PurchasedBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchPurchasedBooks = async () => {
      const purchasesRef = collection(db, 'purchases', user.uid, 'books');
      const purchasesSnapshot = await getDocs(purchasesRef);
      const booksList = purchasesSnapshot.docs.map(doc => doc.data());

      // Fetch cover image and download links (PDF/ePub) from Firebase Storage for each book
      const booksWithDownloadLinks = await Promise.all(
        booksList.map(async (book) => {
          const pdfRef = ref(storage, book.pdfLink);
          const epubRef = ref(storage, book.epubLink);
          const coverImageRef = ref(storage, book.coverImage);

          const pdfDownloadUrl = await getDownloadURL(pdfRef);
          const epubDownloadUrl = await getDownloadURL(epubRef);
          const coverImageUrl = await getDownloadURL(coverImageRef);

          return { ...book, pdfDownloadUrl, epubDownloadUrl, coverImageUrl };
        })
      );

      setPurchasedBooks(booksWithDownloadLinks);
    };

    fetchPurchasedBooks();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Purchased Books</h1>
      {purchasedBooks.length === 0 ? (
        <p>You have no purchased books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedBooks.map((book, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img src={book.coverImageUrl} alt={book.bookName} className="w-full h-64 object-contain rounded mb-4" />
              <h2 className="text-xl font-bold">{book.bookName}</h2>
              <p>Author: {book.author}</p>
              <a href={book.pdfDownloadUrl} className="text-blue-500 hover:underline" download>
                Download PDF
              </a>
              <br />
              <a href={book.epubDownloadUrl} className="text-blue-500 hover:underline" download>
                Download ePub
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedBooks;
