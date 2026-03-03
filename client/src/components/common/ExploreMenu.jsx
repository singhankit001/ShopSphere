import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, 
  Info, 
  Briefcase, 
  BookOpen, 
  Newspaper, 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Mail, 
  User, 
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { handleComingSoon } from '../../utils/ui';

const ExploreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Grouped Links Data
  const groups = [
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
      title: 'Account',
      links: [
        { name: 'Login', path: '/login', icon: User },
        { name: 'Contact Support', path: '/contact', icon: Mail }
      ]
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center gap-2 px-4 h-[56px] rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 transition-all border border-slate-100 group"
      >
        <span className="text-[12px] font-black uppercase tracking-widest">More</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile Toggle Button (if needed, but usually handled by hamburger) */}
      {/* We'll handle mobile within the existing Navbar drawer for consistency */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-3 w-[520px] bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden z-[200]"
          >
            <div className="grid grid-cols-2 gap-0">
              {/* Left Side: Company & Support */}
              <div className="p-8 border-r border-slate-50">
                {groups.slice(0, 2).map((group, idx) => (
                  <div key={idx} className={idx > 0 ? 'mt-8' : ''}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">{group.title}</p>
                    <div className="space-y-1">
                      {group.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#10B981] group-hover:bg-white group-hover:shadow-sm transition-all">
                            <link.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side: Account & Featured */}
              <div className="p-8 bg-slate-50/50">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Account</p>
                  <div className="space-y-1">
                    {groups[2].links.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-[#10B981] transition-all">
                          <link.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured Section */}
                <div className="mt-8 p-6 bg-[#10B981] rounded-2xl text-white relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Join us</p>
                  <p className="text-lg font-black leading-tight mb-4">We're hiring designers & devs!</p>
                  <Link 
                    to="/careers" 
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    View Openings <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Bottom Footer of Menu */}
            <div className="px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ShopSphere v2.0</p>
              <div className="flex gap-4">
                <button 
                  onClick={(e) => handleComingSoon(e, 'Twitter')}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest bg-transparent border-none p-0"
                >
                  Twitter
                </button>
                <button 
                  onClick={(e) => handleComingSoon(e, 'LinkedIn')}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest bg-transparent border-none p-0"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreMenu;
