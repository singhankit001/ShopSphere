import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Loader2, Image as ImageIcon, Sparkles, Box, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    stock: '',
    image: '',
    brand: '',
    deliveryTime: '8 min',
    weight: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://localhost:5001/api/products', formData, config);
      toast.success('Product published to store!', {
        style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to add product. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FDFDFD]">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 mb-12"
        >
           <button 
            onClick={() => navigate('/admin')} 
            className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-emerald-500 shadow-sm border border-slate-100 transition-all hover:border-emerald-100 hover:-translate-x-1"
           >
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight font-premium">Add New Product</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Publish a fresh item to your catalog</p>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                 {/* Section 1: Basic Info */}
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8"
                 >
                    <div className="flex items-center gap-4 mb-2">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                          <Sparkles className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight font-premium">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Product Name</label>
                          <input 
                            name="name" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. Organic Red Tomatoes"
                            value={formData.name} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Brand</label>
                          <input 
                            name="brand" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. Farm Fresh"
                            value={formData.brand} onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                       <textarea 
                         name="description" required rows="4"
                         className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-medium text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300 leading-relaxed"
                         placeholder="What makes this product special?"
                         value={formData.description} onChange={handleChange}
                       ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                          <select 
                            name="category" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all appearance-none cursor-pointer"
                            value={formData.category} onChange={handleChange}
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Weight / Unit</label>
                          <input 
                            name="weight" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. 500g"
                            value={formData.weight} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stock</label>
                          <input 
                            name="stock" type="number" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="100"
                            value={formData.stock} onChange={handleChange}
                          />
                       </div>
                    </div>
                 </motion.div>

                 {/* Section 2: Pricing & Media */}
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8"
                 >
                    <div className="flex items-center gap-4 mb-2">
                       <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                          <ImageIcon className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight font-premium">Pricing & Media</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Base Price (₹)</label>
                          <input 
                            name="price" type="number" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="500"
                            value={formData.price} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Discount Price (₹)</label>
                          <input 
                            name="discountPrice" type="number"
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="450"
                            value={formData.discountPrice} onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Product Image URL</label>
                       <div className="relative">
                          <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            name="image" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4.5 pl-14 pr-6 font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-300"
                            placeholder="Paste high-quality URL here"
                            value={formData.image} onChange={handleChange}
                          />
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 mt-2 flex items-center gap-1.5">
                         <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> Tip: Use transparent PNG for best results
                       </p>
                    </div>
                 </motion.div>

                 {/* Submit Button */}
                 <motion.button 
                   whileHover={{ scale: 1.01 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   disabled={loading}
                   className="w-full py-6 bg-emerald-500 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                     <>Confirm & Publish <Plus className="w-6 h-6" /></>
                   )}
                 </motion.button>
              </form>
           </div>

           {/* Sidebar Preview */}
           <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
              >
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Live SKU Preview</p>
                 <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-full aspect-square bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center justify-center overflow-hidden">
                       <img 
                        src={formData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=40&w=400'} 
                        alt="Preview" 
                        className="w-full h-full object-contain" 
                       />
                    </div>
                    <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{formData.name || 'Untitled Product'}</h4>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{formData.brand || 'Brand Identity'}</p>
                    
                    <div className="mt-6 flex items-baseline gap-3">
                       <span className="text-2xl font-black text-slate-900">₹{formData.discountPrice || formData.price || '0'}</span>
                       {formData.discountPrice && formData.price && (
                         <span className="text-sm text-slate-300 line-through font-bold">₹{formData.price}</span>
                       )}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="px-2 py-1 bg-slate-100 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-widest">{formData.weight || '500g'}</span>
                       <span className="px-2 py-1 bg-emerald-50 rounded-md text-[9px] font-black text-emerald-500 uppercase tracking-widest">{formData.deliveryTime}</span>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
              >
                 <div className="absolute top-0 right-0 w-2/3 h-full bg-emerald-500 opacity-10 blur-[100px]"></div>
                 <div className="relative z-10">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                       <Box className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight font-premium">Listing Tips</h3>
                    <ul className="space-y-6 mt-8">
                       <li className="flex items-start gap-4 text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          Use high-resolution transparent PNGs for a premium look.
                       </li>
                       <li className="flex items-start gap-4 text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          Keep titles concise and highlight the brand name.
                       </li>
                    </ul>
                 </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 text-center shadow-sm"
              >
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                 </div>
                 <h4 className="font-black text-slate-900 text-lg mb-2 font-premium">Quality Control</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-loose">
                    All products are subject to <br /> review before being <br /> live for delivery.
                 </p>
              </motion.div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;
