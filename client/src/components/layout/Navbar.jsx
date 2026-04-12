import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, User as UserIcon, Search, MapPin, ChevronDown, Clock, Zap } from 'lucide-react';

const Navbar = ({ onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setSearchQuery(q);
  }, [location.search]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] glass-nav z-[100] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo & Delivery Info */}
        <div className="flex items-center gap-4 lg:gap-8 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-200">
              S
            </div>
            <span className="hidden xl:block text-2xl font-black tracking-tighter text-slate-900">
              ShopSphere
            </span>
          </Link>

          <div className="hidden lg:flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-[11px] font-black text-slate-900 leading-none mb-1">Delivery in 8 minutes</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-500 max-w-[150px] truncate">Gomti Nagar, Lucknow</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Search Bar - Center */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl relative group"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="text"
            placeholder='Search for "milk", "chips", "atta"'
            className="w-full bg-[#F3F4F6] border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-all">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-700 hidden lg:block pr-2">Account</span>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-black text-slate-700 hover:text-[var(--primary)] transition-all">
                Login
              </Link>
            )}
          </div>

          <button 
            onClick={onOpenCart}
            className="flex items-center gap-3 bg-[var(--primary)] text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-green-100 hover:bg-[var(--primary-dark)] transition-all group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {itemsCount}
                </span>
              )}
            </div>
            <span className="hidden sm:block">
              {itemsCount > 0 ? `₹${subtotal}` : 'My Basket'}
            </span>
          </button>

          <button onClick={toggleMenu} className="lg:hidden p-1">
            <Menu className="w-6 h-6 text-slate-900" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
