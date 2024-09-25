import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const user = auth.currentUser;

  const handleCheckout = async () => {
    if (!user) {
      alert('You must be logged in to proceed to checkout');
      return;
    }

    const purchasesRef = collection(db, 'purchases', user.uid, 'books');

    // Save each book in the user's "purchases" collection in Firestore
    try {
      for (const book of cart) {
        await addDoc(purchasesRef, book);
      }

      // After successful checkout, clear the cart and notify the user
      localStorage.removeItem('cart');
      setCart([]);
      alert('Checkout successful! Your books are now available in Purchased Books.');
    } catch (error) {
      console.error('Error saving purchases:', error);
      alert('There was an issue completing your purchase. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cart.map((book, index) => (
            <div key={index} className="flex items-center bg-white p-6 rounded-lg shadow-lg">
              <img src={book.coverImageUrl} alt={book.bookName} className="w-32 h-32 object-contain rounded mr-6" />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{book.bookName}</h2>
                <p className="text-gray-600">Price: ${book.price}</p>
              </div>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded mt-6"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
