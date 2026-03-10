import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-bg-card/80 backdrop-blur-md border-b border-border z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-muted">
              ShopSphere
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">Shop</Link>
            <Link to="/categories" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">Categories</Link>
            <Link to="/deals" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">Deals</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/cart" className="relative p-2 text-text-muted hover:text-white transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                  {items.length}
                </span>
              )}
            </Link>
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 p-2 px-3 rounded-full bg-border hover:bg-primary/20 hover:text-primary transition-all">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 transition-all">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative p-2 text-text-muted">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                  {items.length}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="p-2 text-text-muted hover:text-white focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-t border-border px-4 pt-2 pb-4 space-y-1">
          <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-white hover:bg-border/50">Shop</Link>
          <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-text-muted hover:text-white hover:bg-border/50">Categories</Link>
          {user ? (
             <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10">My Profile</Link>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
