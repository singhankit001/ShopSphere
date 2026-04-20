import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, LogOut, ShieldCheck, Heart, Package, Bell, ChevronRight, Settings } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully', {
      style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
    navigate('/');
  };

  const menuItems = [
    { icon: Package, title: 'My Orders', desc: 'Track your deliveries', link: '/orders' },
    { icon: Heart, title: 'Wishlist', desc: 'Your favorite items', link: '/wishlist' },
    { icon: MapPin, title: 'Addresses', desc: 'Manage delivery locations', link: '/addresses' },
    { icon: Bell, title: 'Notifications', desc: 'Offers and updates', link: '/notifications' },
    { icon: Settings, title: 'Settings', desc: 'Account preferences', link: '/settings' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar - Profile Card */}
          <div className="w-full md:w-80 shrink-0">
             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-center"
             >
                <div className="w-24 h-24 rounded-full bg-green-50 text-[var(--primary)] flex items-center justify-center text-4xl font-black mx-auto mb-6 border-4 border-white shadow-xl shadow-green-100 relative">
                   {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                   <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                   </div>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-1">{user.name}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{user.role} Member</p>
                
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 truncate">{user.email}</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">{user.phone || '+91 98765 43210'}</span>
                   </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
             </motion.div>
          </div>

          {/* Main Content - Options */}
          <div className="flex-1 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Account Dashboard</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {menuItems.map((item, idx) => (
                     <button 
                      key={idx}
                      onClick={() => navigate(item.link)}
                      className="p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-[var(--primary)] hover:bg-white transition-all flex items-center justify-between group"
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-sm">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <div className="text-left">
                              <p className="font-black text-slate-900 text-sm group-hover:text-[var(--primary)] transition-colors">{item.title}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[var(--primary)] transition-colors" />
                     </button>
                   ))}
                </div>
             </div>

             {/* Loyalty Banner */}
             <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--primary)] opacity-10 blur-[150px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
                         Premium Benefit
                      </div>
                      <h3 className="text-2xl font-black mb-2">ShopSphere Gold Member</h3>
                      <p className="text-slate-400 font-medium text-sm max-w-sm">You have saved ₹1,240 this month with free delivery and exclusive member discounts.</p>
                   </div>
                   <div className="shrink-0 text-center">
                      <p className="text-4xl font-black text-white mb-1">₹4,200</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Savings</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
