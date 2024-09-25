import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import PurchasedBooks from './components/PurchasedBooks';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />

        {/* Protecting all routes with PrivateRoute */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:bookId"
          element={
            <PrivateRoute>
              <Navbar />
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Navbar />
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchased-books"
          element={
            <PrivateRoute>
              <Navbar />
              <PurchasedBooks />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
