import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity, selectCartSubtotal } from '../../store/slices/cartSlice';
import { ShoppingCart, ShoppingBasket, Menu, X, User as UserIcon, Search, MapPin, ChevronDown, Clock, Zap, Home, LayoutGrid, Tag, HelpCircle, Phone, Info, LogIn, Briefcase, BookOpen, Newspaper, ShieldCheck, Lock, FileText, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories as fallbackCategories, products as fallbackProducts } from '../../data/shopData';
import LocationManager from '../features/LocationManager';
import ShopSphereLogo from '../ui/ShopSphereLogo';
import ExploreMenu from './ExploreMenu';

const DEFAULT_DELIVERY_LOCATION = {
  display: 'Gomti Nagar, Lucknow',
  eta: 10,
  isDeliverable: true
};

const loadSavedLocation = () => {
  try {
    const saved = localStorage.getItem('shopsphere_location');
    if (!saved) return DEFAULT_DELIVERY_LOCATION;

    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_DELIVERY_LOCATION,
      ...parsed
    };
  } catch {
    localStorage.removeItem('shopsphere_location');
    return DEFAULT_DELIVERY_LOCATION;
  }
};

const Navbar = ({ onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [deliveryData, setDeliveryData] = useState(loadSavedLocation);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const itemsCount = useSelector(selectCartTotalQuantity);
  const subtotal = useSelector(selectCartSubtotal);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setSearchQuery(q);
  }, [location.search]);

  // Search Suggestions Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filteredProducts = fallbackProducts
        .filter(p => p.name.toLowerCase().includes(query))
        .slice(0, 5)
        .map(p => ({ ...p, type: 'Product' }));
      
      const filteredCategories = fallbackCategories
        .filter(c => c.name.toLowerCase().includes(query))
        .slice(0, 3)
        .map(c => ({ ...c, type: 'Category' }));
      
      setSuggestions([...filteredCategories, ...filteredProducts]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle outside clicks for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle closing on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsLocationModalOpen(false);
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLocationSelect = (data) => {
    setDeliveryData(data);
  };

  const menuLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'All Products', path: '/products', icon: LayoutGrid },
    { name: 'Categories', path: '/categories', icon: Tag },
    { name: 'Offers', path: '/products?sort=-discount', icon: Tag },
    { name: 'My Basket', path: '#', onClick: onOpenCart, icon: ShoppingCart },
    { name: 'Login', path: '/login', icon: LogIn },
  ];

  const exploreGroups = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about', icon: Info },
        { name: 'Careers', path: '/careers', icon: Briefcase },
        { name: 'Blog', path: '/blog', icon: BookOpen },
        { name: 'Press', path: '/press', icon: Newspaper }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help', icon: HelpCircle },
        { name: 'Safety', path: '/safety', icon: ShieldCheck },
        { name: 'Privacy', path: '/privacy', icon: Lock },
        { name: 'Terms', path: '/terms', icon: FileText }
      ]
    },
    {
      title: 'Contact',
      links: [
        { name: 'Support', path: '/contact', icon: Mail },
      ]
    }
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full h-[88px] bg-white/95 backdrop-blur-[20px] z-[100] flex items-center border-b border-slate-100/80 transition-all duration-300 shadow-sm">
        <div className="container h-[88px] flex items-center justify-between gap-[32px]">
          
          {/* Logo & Location Section */}
          <div className="flex items-center gap-[32px] shrink-0">
            <Link to="/" className="flex items-center group hover:opacity-90 transition-opacity">
              <ShopSphereLogo height={38} />
            </Link>

            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-[16px] px-[16px] py-[8px] hover:bg-slate-50 rounded-[16px] transition-all border border-transparent hover:border-slate-100 group h-[56px]"
            >
              <div className="w-[40px] h-[40px] bg-slate-50 rounded-[12px] flex items-center justify-center text-slate-400 group-hover:text-[#10B981] transition-colors">
                <MapPin className="w-[20px] h-[20px]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-[4px]">Deliver to</p>
                <p className="text-sm font-bold text-slate-900 leading-none truncate max-w-[150px]">
                  {deliveryData.display}
                </p>
              </div>
              <ChevronDown className="w-[16px] h-[16px] text-slate-300 group-hover:text-slate-900 transition-colors ml-[4px]" />
            </button>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-[620px] hidden md:block" ref={suggestionRef}>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/products?search=${searchQuery}`);
                  setShowSuggestions(false);
                }
              }}
              className="search-wrapper"
            >
              <Search className="search-icon-global" />
              <input
                type="text"
                className="search-input-global"
                placeholder='Search groceries, fruits & more...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              />
            </form>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[20px] border border-slate-100 shadow-2xl overflow-hidden z-[200]"
                >
                  <div className="max-h-[400px] overflow-y-auto py-2">
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.type === 'Product') {
                            navigate(`/product/${item._id}`);
                          } else {
                            navigate(`/products?category=${item.slug}`);
                          }
                          setShowSuggestions(false);
                          setSearchQuery(item.name);
                        }}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                           <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#10B981] transition-colors line-clamp-1">{item.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{`${item.type} • ${item.brand || 'ShopSphere'}`}</p>
                        </div>
                        {item.type === 'Product' && (
                          <span className="text-sm font-black text-[#10B981]">₹{item.discountPrice || item.price}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-[24px]">
            <Link to="/login" className="hidden lg:block text-[13px] font-black text-slate-900 uppercase tracking-widest hover:text-[#10B981] transition-colors">
              Login
            </Link>

            <ExploreMenu />

            <button 
              onClick={onOpenCart}
              className="h-[56px] px-[24px] bg-[#10B981] text-white rounded-[16px] font-black text-xs uppercase tracking-[0.1em] flex items-center gap-[12px] hover:bg-[#0E9F6E] transition-all shadow-lg shadow-green-100/50 active:scale-95 group relative"
            >
              <div className="relative">
                <ShoppingBasket className="w-[24px] h-[24px]" />
                {itemsCount > 0 && (
                  <span className="absolute -top-[12px] -right-[12px] w-[22px] h-[22px] bg-white text-[#10B981] text-[12px] flex items-center justify-center rounded-full font-black border-2 border-[#10B981] animate-in zoom-in shadow-sm">
                    {itemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block">My Basket</span>
            </button>

            <button 
              className="p-[12px] bg-slate-50 rounded-[14px] text-slate-900 md:hidden hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="drawer-overlay" 
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="side-drawer open"
            >
              <div className="drawer-header">
                <Link to="/" className="flex items-center hover:opacity-90 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                  <ShopSphereLogo height={34} />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="drawer-content">
                <div className="mb-8 p-6 bg-green-50 rounded-[28px] border border-green-100/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#10B981] shadow-sm">
                      <Zap className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Delivery Promise</p>
                      <p className="text-sm font-black text-slate-900">Delivered in {deliveryData.eta || 10} mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-green-700">
                    <MapPin className="w-4 h-4" /> {deliveryData.display}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">Main Menu</p>
                    <div className="space-y-1">
                      {menuLinks.map((link, idx) => (
                        <Link 
                          key={idx} 
                          to={link.path} 
                          className="drawer-link"
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (link.onClick) link.onClick();
                          }}
                        >
                          <link.icon className={`w-5 h-5 ${link.name === 'My Basket' ? 'text-[#10B981]' : 'text-slate-400'}`} />
                          <span className="tracking-tight">{link.name}</span>
                          {link.name === 'My Basket' && itemsCount > 0 && (
                            <span className="ml-auto bg-[#10B981] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                              {itemsCount}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {exploreGroups.map((group, gIdx) => (
                    <div key={gIdx}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">{group.title}</p>
                      <div className="space-y-1">
                        {group.links.map((link, lIdx) => (
                          <Link 
                            key={lIdx} 
                            to={link.path} 
                            className="drawer-link"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <link.icon className="w-5 h-5 text-slate-400" />
                            <span className="tracking-tight">{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-footer">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <Phone className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support</p>
                    <p className="text-xs font-bold text-slate-900">1800-SHOP</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <HelpCircle className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Help</p>
                    <p className="text-xs font-bold text-slate-900">FAQs</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-[0.2em]">
                  ShopSphere v2.0 • Premium Quick Commerce
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <LocationManager 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
};

export default Navbar;
