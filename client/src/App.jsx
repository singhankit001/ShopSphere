import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Placeholder pages (we will implement these in later commits)
const Products = () => <div className="p-20 text-center text-4xl">Products Page</div>;
const Cart = () => <div className="p-20 text-center text-4xl">Cart Page</div>;
const Login = () => <div className="p-20 text-center text-4xl">Login Page</div>;
const NotFound = () => <div className="p-20 text-center text-4xl">404 - Not Found</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
