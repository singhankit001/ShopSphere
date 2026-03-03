import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../features/CartDrawer';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity, selectCartSubtotal } from '../../store/slices/cartSlice';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemsCount = useSelector(selectCartTotalQuantity);
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[var(--primary)]/20 font-inter">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow space-y-12 pb-32 w-full max-w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />

      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Premium Cart Bar (Quick-Commerce Style) */}
      <AnimatePresence>
        {itemsCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[calc(100%-2rem)] max-w-lg"
          >
             <button
               onClick={() => setIsCartOpen(true)}
               className="w-full bg-slate-900 text-white p-3.5 pr-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 flex items-center justify-between group overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                
                <div className="flex items-center gap-4 relative z-10 pl-4">
                   <div className="flex flex-col items-start leading-tight">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{itemsCount} Item{itemsCount > 1 ? 's' : ''}</p>
                      <p className="text-xl font-black tracking-tight">₹{subtotal}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                   <span className="text-xs font-black uppercase tracking-widest text-green-400">View Cart</span>
                   <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-900/20">
                      <ChevronRight className="w-6 h-6 text-white" />
                   </div>
                </div>
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
