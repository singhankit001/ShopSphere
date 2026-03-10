import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                S
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-muted">
                ShopSphere
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Premium e-commerce platform offering the best products with modern digital experiences. Built for excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-text-muted hover:text-white hover:bg-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-text-muted hover:text-white hover:bg-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-text-muted hover:text-white hover:bg-primary transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-text-muted hover:text-primary transition-colors text-sm">All Products</Link></li>
              <li><Link to="/categories/electronics" className="text-text-muted hover:text-primary transition-colors text-sm">Electronics</Link></li>
              <li><Link to="/categories/fashion" className="text-text-muted hover:text-primary transition-colors text-sm">Fashion</Link></li>
              <li><Link to="/sale" className="text-text-muted hover:text-primary transition-colors text-sm">On Sale</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-text-muted hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/shipping" className="text-text-muted hover:text-primary transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="text-text-muted hover:text-primary transition-colors text-sm">Track Order</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-primary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h3 className="text-white font-semibold mb-5 uppercase text-sm tracking-wider">Stay Updated</h3>
            <p className="text-text-muted text-sm mb-4">Subscribe to our newsletter for the latest products and exclusive deals.</p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-bg-dark border border-border rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white rounded-r-lg px-4 py-2 flex items-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
