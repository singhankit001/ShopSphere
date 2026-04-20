import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      dispatch(setCredentials(data));
      toast.success('Welcome back to ShopSphere!', {
        style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@shopsphere.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[420px] w-full bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-green-100">
            S
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm font-medium text-slate-500">Sign in to continue shopping instantly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-green-50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)]" />
              <label className="ml-2 text-xs font-bold text-slate-500">Remember me</label>
            </div>
            <Link to="/forgot-password" title="Coming soon!" className="text-xs font-black text-[var(--primary)] hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="px-4 bg-white text-slate-400">OR</span></div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Demo Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-black text-[var(--primary)] hover:underline">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
