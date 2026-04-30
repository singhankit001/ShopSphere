import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, ArrowRight, Loader2, CheckCircle, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ShopSphereLogo from '../components/ui/ShopSphereLogo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', { email, password });
      dispatch(setCredentials(data));
      toast.success('Welcome to ShopSphere!', {
        style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      const from = location.state?.from || (data.role === 'admin' ? '/admin' : '/');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@shopsphere.com');
    setPassword('password123');
  };

  const handleAdminDemoLogin = () => {
    toast('Please enter your admin credentials to proceed.', {
      icon: '🔐',
      style: { borderRadius: '12px', background: '#0F172A', color: '#fff', fontSize: '11px', fontWeight: 'bold' }
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/google', { 
        idToken: credentialResponse.credential 
      });
      dispatch(setCredentials(data));
      toast.success('Welcome to ShopSphere!', {
        style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      const from = location.state?.from || (data.role === 'admin' ? '/admin' : '/');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1100px] w-full flex flex-col lg:flex-row bg-white rounded-[3.5rem] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10 overflow-hidden">
        
        {/* Auth Section */}
        <div className="w-full lg:w-[480px] p-10 md:p-14 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center md:text-left mb-12">
              <div className="mb-10 flex justify-center md:justify-start">
                <ShopSphereLogo height={42} />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight font-premium">Welcome Back</h1>
              <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Secure Access Point</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Authority</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="name@shopsphere.com"
                    className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] pl-16 pr-6 font-bold outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-[20px] pl-16 pr-6 font-bold outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer transition-all" />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Remember Me</span>
                </label>
                <Link to="/forgot-password" title="Module under maintenance" className="text-xs font-black text-emerald-500 hover:underline tracking-tight">Forgot Secret?</Link>
              </div>

              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-emerald-500 text-white rounded-[24px] shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] font-black transition-all active:scale-95 hover:bg-emerald-600"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Access Console <ArrowRight className="w-5 h-5" /></>}
                </button>

                <div className="pt-2">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] flex-1 bg-slate-100"></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or Continue With</span>
                      <div className="h-[1px] flex-1 bg-slate-100"></div>
                   </div>
                   <div className="flex justify-center">
                      {(import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_ID.length > 10 && !import.meta.env.VITE_GOOGLE_CLIENT_ID.startsWith('YOUR_')) ? (
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => toast.error('Google Auth Failed')}
                          theme="outline"
                          size="large"
                          shape="pill"
                          width="100%"
                        />
                      ) : (
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Google Login Disabled</div>
                      )}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="h-14 bg-white border border-slate-100 text-slate-900 hover:bg-slate-50 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black transition-all active:scale-95"
                   >
                     Customer ID
                   </button>
                   <button
                    type="button"
                    onClick={handleAdminDemoLogin}
                    className="h-14 bg-slate-900 text-white hover:bg-black rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black transition-all active:scale-95"
                   >
                     Admin ID
                   </button>
                </div>
              </div>
            </form>

            <p className="mt-12 text-center md:text-left text-sm font-bold text-slate-400">
              New Operator?{' '}
              <Link to="/signup" className="font-black text-emerald-500 hover:underline">Register SKU</Link>
            </p>
          </motion.div>
        </div>

        {/* Brand Side Panel */}
        <div className="hidden lg:flex lg:w-[620px] bg-slate-900 relative p-16 flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="mb-16">
              <ShopSphereLogo height={32} theme="dark" />
            </div>
            <h2 className="text-6xl font-black text-white leading-[1.05] tracking-tight mb-12 font-premium">
              Hyperlocal <br /> Logistics <br /> <span className="text-emerald-500">Mastery.</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: Zap, text: '8-Min Flash Delivery Protocol' },
                { icon: ShieldCheck, text: 'Secure Settlement Layer' },
                { icon: Sparkles, text: 'Premium Curated SKU Network' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-6 text-slate-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 transition-all group-hover:scale-110">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black tracking-tight text-slate-200">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500 opacity-5 blur-3xl"></div>
              <p className="text-slate-300 text-lg leading-relaxed font-bold italic pr-8">
                "The most efficient logistics stack in the market today. Unmatched precision."
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20">
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">A</div>
                </div>
                <div>
                   <p className="text-sm font-black text-white tracking-wide">Ankit Singh</p>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
