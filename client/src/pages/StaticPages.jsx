import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { 
  ArrowLeft, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Newspaper, 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  FileText,
  ChevronRight,
  Zap,
  Globe,
  Smile,
  Search,
  ChevronDown,
  CheckCircle2,
  Truck,
  Heart,
  Store,
  CreditCard,
  PhoneCall,
  Users,
  Mail
} from 'lucide-react';
import { handleComingSoon } from '../utils/ui';

const PageHero = ({ title, description, icon: Icon, color = "bg-emerald-50", textColor = "text-[#10B981]" }) => (
  <section className={`!py-[80px] lg:!py-[96px] ${color} border-b border-slate-100 relative overflow-hidden`}>
    <div className="container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-[80px] h-[80px] ${color.replace('50', '100')} rounded-[24px] flex items-center justify-center mx-auto mb-[32px] shadow-sm`}
      >
        <Icon className={`w-[40px] h-[40px] ${textColor}`} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl lg:text-7xl font-black text-slate-900 mb-[24px] tracking-tight font-premium"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 text-lg lg:text-xl font-medium max-w-[640px] mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  </section>
);

export const Careers = () => (
  <div className="bg-white min-h-screen">
    <PageHero 
      title="Join the Future" 
      description="We're looking for passionate individuals to help us build the world's most efficient instant commerce platform."
      icon={Briefcase}
      color="bg-blue-50"
      textColor="text-blue-500"
    />
    <section className="container !py-[64px] lg:!py-[96px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] lg:gap-[96px] items-center mb-[96px]">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-[24px] tracking-tight">Our Culture</h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-[40px] max-w-[560px]">
            At ShopSphere, we value speed, ownership, and empathy. We're a team of builders who believe that technology can fundamentally improve daily lives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            {[
              { t: 'Remote-First', d: 'Work from anywhere' },
              { t: 'Fast-Paced', d: 'Iterate and ship daily' },
              { t: 'Ownership', d: 'Be the CEO of your role' },
              { t: 'Growth', d: 'Continuous learning' }
            ].map((item, i) => (
              <div key={i} className="card-global !p-[32px]">
                <h4 className="card-title-global !text-[18px] !mb-1">{item.t}</h4>
                <p className="card-desc-global !text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-global-dark !p-[64px] !bg-slate-900 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-[#10B981]/10 blur-[80px]"></div>
          <h3 className="text-3xl font-black mb-[32px] text-white relative z-10">Why Join Us?</h3>
          <ul className="space-y-[24px] relative z-10">
            {[
              'Equity and competitive salary',
              'Unlimited paid time off',
              'Health and wellness stipend',
              'Latest tech equipment budget'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-[16px]">
                <div className="w-[32px] h-[32px] rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#10B981] fill-current" />
                </div>
                <span className="font-bold text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-[64px] tracking-tight">Open Roles</h2>
        <div className="max-w-[880px] mx-auto space-y-[16px]">
          {[
            { role: 'Senior Product Designer', team: 'Design', loc: 'Remote' },
            { role: 'Backend Engineer (Go/Node)', team: 'Engineering', loc: 'Remote' },
            { role: 'Logistics Operations Lead', team: 'Operations', loc: 'Lucknow, IN' }
          ].map((role, i) => (
            <div key={i} className="group card-global !p-[32px] !flex-row items-center justify-between gap-[24px]">
              <div className="text-left">
                <h4 className="card-title-global !text-[22px] !mb-1 group-hover:text-[#10B981] transition-colors">{role.role}</h4>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">{role.team} • {role.loc}</p>
              </div>
              <button 
                onClick={(e) => handleComingSoon(e, 'Job Application')}
                className="h-[56px] px-[32px] bg-slate-900 text-white rounded-[16px] font-black text-[12px] uppercase tracking-widest group-hover:bg-[#10B981] transition-all"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export const Blog = () => (
  <div className="bg-white min-h-screen">
    <PageHero
      title="The ShopSphere Blog"
      description="Stories, insights, and updates from the team building the future of instant delivery."
      icon={BookOpen}
      color="bg-purple-50"
      textColor="text-purple-500"
    />
    <section className="py-[80px] container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
        {blogPosts.map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            {/* Entire card is a Link */}
            <Link
              to={`/blog/${blog.slug}`}
              className="group flex flex-col bg-white rounded-[28px] border border-slate-100 overflow-hidden hover:shadow-[0_12px_40px_rgb(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-[4px] cursor-pointer"
            >
              {/* Cover image */}
              <div className="h-[220px] overflow-hidden relative flex-shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category badge */}
                <span className={`absolute top-[16px] left-[16px] px-[12px] py-[5px] rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md bg-white/90 ${blog.categoryColor}`}>
                  {blog.category}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-grow p-[28px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-[10px]">
                  {blog.date} &nbsp;·&nbsp; {blog.readTime}
                </p>
                <h3 className="text-[19px] font-black text-slate-900 leading-snug mb-[10px] group-hover:text-purple-600 transition-colors tracking-tight"
                  style={{ wordBreak: 'keep-all' }}>
                  {blog.title}
                </h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-[20px] flex-grow">
                  {blog.excerpt}
                </p>
                {/* CTA row */}
                <div className="flex items-center gap-[6px] text-[11px] font-black text-slate-900 uppercase tracking-widest group-hover:text-purple-600 group-hover:gap-[10px] transition-all mt-auto">
                  Read Article
                  <ChevronRight className="w-[14px] h-[14px]" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);


export const Press = () => (
  <div className="bg-white min-h-screen">
    <PageHero 
      title="Press Room" 
      description="The latest announcements, media resources, and milestones from ShopSphere."
      icon={Newspaper}
      color="bg-orange-50"
      textColor="text-orange-500"
    />
    <section className="py-24 container px-4 max-w-5xl mx-auto">
      <div className="space-y-12">
        {[
          { date: 'Oct 2024', title: 'ShopSphere raises $20M in Series A funding', source: 'TechCrunch' },
          { date: 'Sep 2024', title: 'The new standard of grocery delivery in Lucknow', source: 'The Economic Times' },
          { date: 'Aug 2024', title: 'ShopSphere partners with 1000+ local organic farmers', source: 'YourStory' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 pb-12 last:border-0 group cursor-pointer">
            <div className="shrink-0 pt-1">
               <p className="text-orange-500 font-black text-sm uppercase tracking-widest">{item.date}</p>
            </div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-orange-500 transition-colors">{item.title}</h3>
               <p className="text-slate-500 text-lg font-medium mb-6">Published in <span className="text-slate-900 font-bold">{item.source}</span></p>
               <button 
                 onClick={(e) => handleComingSoon(e, 'Press Release')}
                 className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest"
               >
                 View Release <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [expandedId, setExpandedId] = React.useState(null);

  const faqCategories = ['All', 'Orders', 'Delivery', 'Payments', 'Returns'];

  const allFaqs = [
    { id: 1, cat: 'Orders', q: 'Where is my order?', a: 'You can track your order in real-time from the "Orders" section in your profile. Once an order is placed, you will see a live map tracking your delivery partner.' },
    { id: 2, cat: 'Returns', q: 'How do I return items?', a: 'We have a no-questions-asked return policy. You can initiate a return through the app within 15 minutes of delivery if the items are in original condition.' },
    { id: 3, cat: 'Delivery', q: 'Is there a delivery fee?', a: 'Delivery is free for all orders above ₹199. For orders below this amount, a nominal delivery fee of ₹15 is charged to support our delivery partners.' },
    { id: 4, cat: 'Orders', q: 'Can I cancel my order?', a: 'Orders can only be cancelled before they are dispatched from our dark store. Once the delivery partner has picked up your order, cancellation is not possible.' },
    { id: 5, cat: 'Payments', q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), and Net Banking. Cash on Delivery is available in select locations.' },
    { id: 6, cat: 'Delivery', q: 'What are your delivery hours?', a: 'We operate 24/7 in most urban areas. However, specific store timings might vary based on local regulations and stock availability.' }
  ];

  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || faq.cat === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-32 bg-gradient-to-br from-green-50 via-white to-green-50/30 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm"
          >
            <HelpCircle className="w-10 h-10 text-[#10B981]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-premium"
          >
            How can we help?
          </motion.h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto search-wrapper">
             <Search className="search-icon-global" />
             <input 
               type="text" 
               placeholder="Search for help, orders, returns..."
               className="search-input-global !shadow-xl !shadow-slate-200/50"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
      </section>

      <section className="py-24 container px-4 max-w-4xl mx-auto">
         {/* Categories */}
         <div className="flex flex-wrap justify-center gap-3 mb-16">
            {faqCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border-2 ${
                  activeCategory === cat 
                  ? 'bg-[#10B981] text-white border-[#10B981] shadow-lg shadow-green-100' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>

         {/* FAQs Accordion */}
         <div className="space-y-4 mb-24">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`bg-white border transition-all duration-300 rounded-[2rem] overflow-hidden ${
                  expandedId === faq.id ? 'border-[#10B981] shadow-xl shadow-green-50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                 <button 
                   onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                   className="w-full p-8 flex items-center justify-between text-left group"
                 >
                    <span className={`text-lg font-black tracking-tight transition-colors ${expandedId === faq.id ? 'text-[#10B981]' : 'text-slate-900'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedId === faq.id ? 'bg-[#10B981] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                       <ChevronDown className="w-5 h-5" />
                    </div>
                 </button>
                 {expandedId === faq.id && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     className="px-8 pb-8"
                   >
                      <div className="pt-2 border-t border-slate-50">
                         <p className="text-slate-500 font-medium leading-relaxed pt-6">
                           {faq.a}
                         </p>
                      </div>
                   </motion.div>
                 )}
              </div>
            )) : (
              <div className="py-20 text-center">
                 <p className="text-slate-400 font-black text-xl">No results found for "{searchQuery}"</p>
                 <button onClick={() => setSearchQuery('')} className="mt-4 text-[#10B981] font-bold underline">Clear search</button>
              </div>
            )}
         </div>

         {/* CTA Section */}
         <div className="card-global-dark !p-[64px] !bg-slate-900 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-[#10B981]/15 blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 text-center">
               <h3 className="text-4xl lg:text-5xl font-black text-white mb-[16px] tracking-tight">Still need help?</h3>
               <p className="text-slate-400 text-lg font-medium mb-[40px] max-w-[560px] mx-auto leading-relaxed">Our support team is available 24/7 to assist you with any questions or concerns.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-[16px]">
                  <button 
                    onClick={(e) => handleComingSoon(e, 'Live Chat')}
                    className="h-[64px] px-[40px] bg-[#10B981] text-white rounded-[20px] font-black text-[12px] uppercase tracking-widest hover:bg-[#0E9F6E] transition-all shadow-xl shadow-green-900/20 active:scale-95"
                  >
                    Chat with us
                  </button>
                  <button 
                    onClick={(e) => handleComingSoon(e, 'Email Support')}
                    className="h-[64px] px-[40px] bg-white/5 border border-white/10 text-white rounded-[20px] font-black text-[12px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                  >
                    Email Support
                  </button>
               </div>
            </div>
         </div>
      </section>
      <div className="h-20" /> {/* Spacer for footer */}
    </div>
  );
};

const ContentPage = ({ title, icon: Icon, color, textColor, children }) => (
  <div className="bg-white min-h-screen">
    <PageHero title={title} description={`Official ${title.toLowerCase()} and guidelines for ShopSphere.`} icon={Icon} color={color} textColor={textColor} />
    <section className="py-24 container px-4 max-w-4xl mx-auto prose prose-slate prose-lg">
       <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 space-y-10">
          {children}
       </div>
    </section>
  </div>
);

export const Safety = () => {
  const safetySections = [
    {
      title: 'Delivery Safety',
      icon: Truck,
      color: 'bg-blue-50',
      textColor: 'text-blue-500',
      points: [
        { t: 'Contactless Delivery', d: 'Zero-contact delivery to your doorstep for maximum safety.' },
        { t: 'Trained Partners', d: 'Delivery partners trained in hygiene and safety protocols.' },
        { t: 'Real-time Tracking', d: 'Monitor your order from store to door with live GPS.' },
        { t: 'Secure Handling', d: 'Specialized handling for fragile and temperature-sensitive items.' }
      ]
    },
    {
      title: 'Product Quality & Hygiene',
      icon: Heart,
      color: 'bg-emerald-50',
      textColor: 'text-emerald-500',
      points: [
        { t: 'Fresh Sourcing', d: 'Products sourced directly from verified farmers and brands.' },
        { t: 'Temp Control', d: 'Stored in state-of-the-art cold storage facilities.' },
        { t: 'Triple Quality Check', d: 'Every item is inspected 3 times before being packed.' },
        { t: 'Hygiene Standards', d: 'Strict sanitization protocols in all our dark stores.' }
      ]
    },
    {
      title: 'Partner & Store Safety',
      icon: Store,
      color: 'bg-purple-50',
      textColor: 'text-purple-500',
      points: [
        { t: 'Verified Suppliers', d: 'Only partners who meet our strict safety criteria.' },
        { t: 'Regular Audits', d: 'Weekly hygiene and inventory audits of dark stores.' },
        { t: 'Global Compliance', d: 'FSSAI and global safety standards compliance.' },
        { t: 'Secure Warehousing', d: 'Dust-free, pest-controlled storage environments.' }
      ]
    },
    {
      title: 'Customer Protection',
      icon: CreditCard,
      color: 'bg-orange-50',
      textColor: 'text-orange-500',
      points: [
        { t: 'Easy Returns', d: 'No-questions-asked return policy for damaged items.' },
        { t: 'Secure Payments', d: 'Industry-standard encryption for all transactions.' },
        { t: 'Instant Refunds', d: 'Get your money back in minutes for cancelled orders.' },
        { t: '24/7 Support', d: 'Dedicated safety team to handle your concerns.' }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title="Safety & Trust" 
        description="Your safety is our top priority. We implement world-class hygiene and security standards at every step."
        icon={ShieldCheck}
        color="bg-emerald-50"
        textColor="text-emerald-500"
      />

      {/* Trust Badges */}
      <section className="py-12 border-b border-slate-50 bg-slate-50/30">
        <div className="container px-4">
           <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {[
                { icon: CheckCircle2, text: '100% Quality Checked' },
                { icon: Users, text: 'Trusted by 10k+ Users' },
                { icon: ShieldCheck, text: 'Secure Payments' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3">
                   <badge.icon className="w-5 h-5 text-emerald-500" />
                   <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{badge.text}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Safety Sections Grid */}
      <section className="py-24 container px-4">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {safetySections.map((section, idx) => (
              <div key={idx} className="space-y-10">
                 <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${section.color} rounded-2xl flex items-center justify-center ${section.textColor} shadow-sm shrink-0`}>
                       <section.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">{section.title}</h2>
                 </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {section.points.map((point, i) => (
                      <div key={i} className="card-global !p-8 group">
                         <h4 className="card-title-global group-hover:text-emerald-500 transition-colors">{point.t}</h4>
                         <p className="card-desc-global !text-sm">{point.d}</p>
                      </div>
                    ))}
                  </div>
              </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container px-4 pb-40">
         <div className="p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-emerald-500/15 to-transparent blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
               <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter">Still have concerns?</h3>
               <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">Our dedicated safety and support team is ready to address any queries you might have about our processes.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={(e) => handleComingSoon(e, 'Call Support')}
                    className="h-16 px-10 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <PhoneCall className="w-4 h-4" /> Call Support
                  </button>
                  <button 
                    onClick={(e) => handleComingSoon(e, 'Email Safety Team')}
                    className="h-16 px-10 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Mail className="w-4 h-4" /> Email Safety Team
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export const Privacy = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'Welcome to ShopSphere. We are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our mobile application.'
    },
    {
      id: 'collection',
      title: '2. Information We Collect',
      content: 'We collect information that you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes:',
      bullets: [
        'Personal identifiers (Name, Email, Phone Number)',
        'Delivery Information (Physical Address, Location Data)',
        'Payment Information (Processed securely via third-party partners)',
        'Order History and Preferences'
      ]
    },
    {
      id: 'usage',
      title: '3. How We Use Your Information',
      content: 'We use the collected data to provide and maintain our service, including:',
      bullets: [
        'Processing and delivering your orders',
        'Managing your account and providing support',
        'Sending transaction updates and promotional offers',
        'Improving our app performance and user experience'
      ]
    },
    {
      id: 'sharing',
      title: '4. Data Sharing & Third Parties',
      content: 'We do not sell your personal data. We only share information with third parties in limited circumstances:',
      bullets: [
        'With delivery partners to fulfill your orders',
        'With payment processors to facilitate transactions',
        'To comply with legal obligations or protect our rights',
        'With service providers who help us run our business'
      ]
    },
    {
      id: 'security',
      title: '5. Data Security',
      content: 'We implement industry-standard security measures to protect your data. This includes encryption of sensitive information, regular security audits, and strict access controls for our employees and partners.'
    },
    {
      id: 'cookies',
      title: '6. Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
    },
    {
      id: 'rights',
      title: '7. Your Rights',
      content: 'Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the information we hold about you. Contact our privacy team to exercise these rights.'
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100"
          >
            <Lock className="w-8 h-8 text-slate-900" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight font-premium">Privacy Policy</h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">Official guidelines on how we protect your personal data.</p>
        </div>
      </section>

      <section className="py-20 container px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-2">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 px-4">On this page</p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-[#10B981] hover:bg-green-50 transition-all"
                >
                  {section.title.split('. ')[1]}
                </button>
              ))}
            </div>
          </aside>

          {/* Policy Content */}
          <div className="flex-1 max-w-3xl">
            <div className="mb-12 flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
               <p className="text-sm font-bold text-slate-600">Last Updated: <span className="text-slate-900">October 30, 2024</span></p>
            </div>

            <div className="space-y-20">
              {sections.map((section, i) => (
                <div key={i} id={section.id} className="scroll-mt-32">
                  <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{section.title}</h2>
                  <div className="space-y-6">
                    <p className="text-slate-600 text-lg font-medium leading-[1.8]">{section.content}</p>
                    {section.bullets && (
                      <ul className="space-y-5 pl-2">
                        {section.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-5 group">
                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#10B981] group-hover:scale-150 transition-transform shrink-0" />
                            <span className="text-slate-600 font-bold leading-[1.6]">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {i < sections.length - 1 && <div className="mt-20 h-px bg-slate-50" />}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-32 p-10 lg:p-14 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 blur-[100px] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6 tracking-tight">8. Contact Information</h3>
                <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed max-w-xl">If you have any questions about this Privacy Policy or our data practices, please reach out to our privacy team:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em]">Privacy Email</p>
                    <p className="text-xl font-black text-white">privacy@shopsphere.com</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em]">Address</p>
                    <p className="text-xl font-black text-white leading-tight">Lucknow, Uttar Pradesh, <br />India 226010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-20" />
    </div>
  );
};

export const Terms = () => (
  <div className="bg-white min-h-screen">
    <PageHero 
      title="Terms of Service" 
      description="Official guidelines and legal terms for using the ShopSphere platform."
      icon={FileText}
      color="bg-slate-50"
      textColor="text-slate-900"
    />
    <section className="container !py-[64px] lg:!py-[96px]">
      <div className="max-w-[880px] mx-auto">
        <div className="card-global !p-[64px] !bg-slate-50 border-slate-100">
           <h3 className="card-title-global !text-[28px] !mb-[24px]">Platform Terms & Conditions</h3>
           <p className="card-desc-global !text-lg !mb-[48px] !leading-relaxed">By using ShopSphere, you agree to these terms. Please read them carefully. These terms govern your use of our website, mobile app, and delivery services.</p>
           
           <div className="space-y-[48px]">
             {[
               { t: '1. Eligibility', d: 'You must be at least 18 years old to use our platform and provide accurate registration information.' },
               { t: '2. Your Account', d: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.' },
               { t: '3. Payment & Security', d: 'All payments are processed securely via encrypted third-party gateways. ShopSphere does not store your full card details.' },
               { t: '4. Delivery Policy', d: 'We aim for 8-minute delivery but estimated times may vary based on weather, traffic, and order volume.' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <h4 className="card-title-global !text-[20px] !mb-[12px] group-hover:text-[#10B981] transition-colors">{item.t}</h4>
                  <p className="card-desc-global !text-base">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-[64px] pt-[48px] border-t border-slate-200/60 text-center">
               <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-[24px]">Questions about our terms?</p>
               <button 
                 onClick={(e) => handleComingSoon(e, 'Legal Team Contact')}
                 className="h-[56px] px-[32px] bg-slate-900 text-white rounded-[16px] font-black text-[12px] uppercase tracking-widest hover:bg-[#10B981] transition-all"
               >
                 Contact Legal Team
               </button>
            </div>
         </div>
       </div>
     </section>
   </div>
);

export const Contact = () => (
  <div className="bg-white min-h-screen">
    <PageHero 
      title="Get in Touch" 
      description="We're here to help. Reach out to us for any queries, support, or partnership opportunities."
      icon={PhoneCall}
      color="bg-slate-50"
      textColor="text-slate-900"
    />
    <section className="container !py-[64px] lg:!py-[96px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card-global !p-10 !bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 tracking-tight">Support Channels</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#10B981]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email us at</p>
                    <p className="text-lg font-bold">support@shopsphere.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#10B981]">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call us at</p>
                    <p className="text-lg font-bold">1800-SHOP-SPHERE</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#10B981]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visit us at</p>
                    <p className="text-lg font-bold">Gomti Nagar, Lucknow, IN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-global !p-10 border-slate-100">
            <h3 className="card-title-global !text-2xl !mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                  <input type="text" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#10B981] transition-all outline-none text-sm font-bold" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                  <input type="text" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#10B981] transition-all outline-none text-sm font-bold" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#10B981] transition-all outline-none text-sm font-bold" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                <textarea className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#10B981] transition-all outline-none text-sm font-bold h-32 resize-none" placeholder="How can we help you?" />
              </div>
              <button 
                onClick={(e) => handleComingSoon(e, 'Message Submission')}
                className="w-full h-16 bg-[#10B981] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0E9F6E] transition-all shadow-lg shadow-green-100 active:scale-95"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);
