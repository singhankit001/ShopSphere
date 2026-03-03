import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Camera, MessageSquare, Link as ExternalLinkIcon, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import { handleComingSoon } from '../../utils/ui';
import ShopSphereLogo from '../ui/ShopSphereLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Blog', path: '/blog' },
        { label: 'Press', path: '/press' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { label: 'Fresh Produce', path: '/products?category=fruits-vegetables' },
        { label: 'Dairy & Eggs', path: '/products?category=dairy-bread-eggs' },
        { label: 'Snacks', path: '/products?category=snacks-munchies' },
        { label: 'Personal Care', path: '/products?category=personal-care' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Safety', path: '/safety' },
        { label: 'Privacy', path: '/privacy' },
        { label: 'Terms', path: '/terms' }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-[64px] pb-[32px] overflow-hidden relative">
      <div className="container">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[64px] mb-[64px]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex mb-[32px] hover:opacity-90 transition-opacity">
              <ShopSphereLogo height={42} />
            </Link>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-[32px] max-w-[360px]">
              Reimagining the future of instant commerce. Delivering fresh groceries and daily essentials to your door in minutes.
            </p>
            <div className="flex items-center gap-[16px]">
              {[
                { 
                  Icon: Camera, 
                  label: 'Open Instagram', 
                  action: (e) => handleComingSoon(e, 'Instagram') 
                },
                { 
                  Icon: MessageSquare, 
                  label: 'Contact Support', 
                  path: '/contact'
                },
                { 
                  Icon: ExternalLinkIcon, 
                  label: 'Copy Website Link', 
                  action: (e) => {
                    navigator.clipboard.writeText(window.location.origin);
                    toast.success('Link copied to clipboard!');
                  }
                },
                { 
                  Icon: Video, 
                  label: 'Watch Demo', 
                  action: (e) => handleComingSoon(e, 'Demo Video') 
                }
              ].map((social, idx) => {
                if (social.path) {
                  return (
                    <Link
                      key={idx}
                      to={social.path}
                      aria-label={social.label}
                      title={social.label}
                      className="w-[48px] h-[48px] bg-slate-50 rounded-[12px] flex items-center justify-center text-slate-400 hover:bg-[#10B981] hover:text-white transition-all shadow-sm group"
                    >
                      <social.Icon className="w-[20px] h-[20px] transition-transform group-hover:scale-110" />
                    </Link>
                  );
                }
                return (
                  <button 
                    key={idx} 
                    onClick={(e) => {
                      e.preventDefault();
                      social.action(e);
                    }}
                    aria-label={social.label}
                    title={social.label}
                    className="w-[48px] h-[48px] bg-slate-50 rounded-[12px] flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm group cursor-pointer"
                  >
                    <social.Icon className="w-[20px] h-[20px] transition-transform group-hover:scale-110" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-black text-slate-900 mb-[24px] uppercase tracking-[0.2em] text-[11px]">{section.title}</h4>
              <ul className="space-y-[12px]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-[14px] font-bold text-slate-500 hover:text-[#10B981] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] py-[48px] border-y border-slate-50 mb-[48px]">
            {[
              { 
                icon: Mail, 
                label: 'Email Support', 
                val: 'support@shopsphere.com',
                href: 'mailto:support@shopsphere.com'
              },
              { 
                icon: Phone, 
                label: 'Toll Free', 
                val: '+91 1800 234 5678',
                href: 'tel:+9118002345678'
              },
              { 
                icon: MapPin, 
                label: 'Headquarters', 
                val: 'Lucknow, Uttar Pradesh',
                href: 'https://maps.google.com/?q=Lucknow,Uttar+Pradesh',
                external: true
              }
            ].map((contact, i) => (
              <a 
                key={i} 
                href={contact.href}
                className="card-global !p-[24px] !flex-row items-center gap-[20px] !bg-slate-50/50 hover:!bg-white border-transparent hover:border-slate-100"
              >
                <div className="w-[48px] h-[48px] bg-white rounded-[12px] flex items-center justify-center text-slate-900 shadow-sm shrink-0">
                   <contact.icon className="w-[20px] h-[20px]" />
                </div>
                <div className="min-w-0">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-[2px]">{contact.label}</p>
                   <p className="text-[14px] font-black text-slate-900 truncate">{contact.val}</p>
                </div>
              </a>
            ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-[32px] pt-[16px]">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-[4px]">© {currentYear} ShopSphere Technologies Pvt Ltd.</p>
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-[8px] justify-center md:justify-start">
               Designed with <span className="text-rose-400">❤️</span> for premium instant commerce
            </p>
          </div>
          <div className="flex items-center gap-[16px] grayscale opacity-30">
             {['VISA', 'UPI', 'MASTERCARD', 'AMEX'].map(pay => (
               <div key={pay} className="h-[40px] px-[16px] bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-center font-black text-[9px] uppercase tracking-tighter text-slate-400">{pay}</div>
             ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
