import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Camera, MessageCircle, Globe, Video, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100">
                S
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">ShopSphere</span>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              Experience the magic of instant commerce. ShopSphere delivers fresh groceries, daily essentials, and more to your doorstep in as fast as 8 minutes.
            </p>
            <div className="flex items-center gap-4">
              {[Camera, MessageCircle, Globe, Video].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Newsroom'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-slate-500 hover:text-[var(--primary)] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Categories</h4>
            <ul className="space-y-4">
              {['Fruits & Veggies', 'Dairy & Bread', 'Snacks', 'Personal Care'].map((item) => (
                <li key={item}>
                  <Link to={`/products?category=${item}`} className="text-sm font-bold text-slate-500 hover:text-[var(--primary)] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Use', 'Privacy Policy', 'Returns'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-slate-500 hover:text-[var(--primary)] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-slate-50 mb-10">
           <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                 <Mail className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                 <p className="text-sm font-black text-slate-900">support@shopsphere.com</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                 <Phone className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Toll Free</p>
                 <p className="text-sm font-black text-slate-900">+91 1800 234 5678</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                 <MapPin className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Headquarters</p>
                 <p className="text-sm font-black text-slate-900">Gomti Nagar, Lucknow</p>
              </div>
           </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">© {currentYear} ShopSphere Technologies Pvt Ltd. All rights reserved.</p>
            <p className="text-slate-300 text-[9px] font-bold uppercase tracking-widest">Designed with ❤️ for premium instant commerce</p>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
             <div className="h-8 w-12 bg-slate-100 rounded-lg flex items-center justify-center font-black text-[8px] uppercase">VISA</div>
             <div className="h-8 w-12 bg-slate-100 rounded-lg flex items-center justify-center font-black text-[8px] uppercase">UPI</div>
             <div className="h-8 w-12 bg-slate-100 rounded-lg flex items-center justify-center font-black text-[8px] uppercase">MC</div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
