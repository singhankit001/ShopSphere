import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, ArrowRight, Loader2, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import axios from 'axios';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ShopSphereLogo from '../components/ui/ShopSphereLogo';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', formData);
      dispatch(setCredentials(data));
      toast.success('Welcome to ShopSphere!', {
        style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[540px] w-full bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.08)] relative z-10"
      >
        <div className="text-center mb-12">
          <div className="mb-10 flex justify-center">
            <ShopSphereLogo height={42} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight font-premium">Join ShopSphere</h1>
          <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Create your operator profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                <User className="w-3 h-3" /> Identity
              </label>
              <div className="relative group">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email Address
              </label>
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@shopsphere.com"
                  className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                <Phone className="w-3 h-3" /> Contact Number
              </label>
              <div className="relative group">
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Access Key
              </label>
              <div className="relative group">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] px-6 font-bold text-slate-900 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-4">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
               <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Data protection and <br /> privacy protocols active</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-emerald-500 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Initialize Account <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="mt-12 text-center text-sm font-bold text-slate-400">
          Already Registered?{' '}
          <Link to="/login" className="font-black text-emerald-500 hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
