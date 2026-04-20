import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, ArrowRight, Loader2, Phone, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

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
      const { data } = await axios.post('http://localhost:5001/api/auth/register', formData);
      dispatch(setCredentials(data));
      toast.success('Account created successfully!', {
        style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[480px] w-full bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-green-100">
            S
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
          <p className="text-sm font-medium text-slate-500">Join the magic of 8-minute delivery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-2">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure data encryption enabled</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="mt-10 text-center text-sm font-medium text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-black text-[var(--primary)] hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
