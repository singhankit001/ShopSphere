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
    window.scrollTo(0, 0);
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
        style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to add product. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-12">
           <button onClick={() => navigate('/admin')} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Add New Product</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Publish a fresh item to your catalog</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                    
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[var(--primary)]">
                          <Sparkles className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                          <input 
                            name="name" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. Organic Red Tomatoes"
                            value={formData.name} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand</label>
                          <input 
                            name="brand" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. Farm Fresh"
                            value={formData.brand} onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                       <textarea 
                         name="description" required rows="4"
                         className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-bold text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                         placeholder="What makes this product special?"
                         value={formData.description} onChange={handleChange}
                       ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                          <select 
                            name="category" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all appearance-none"
                            value={formData.category} onChange={handleChange}
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight / Unit</label>
                          <input 
                            name="weight" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="e.g. 500g"
                            value={formData.weight} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                          <input 
                            name="stock" type="number" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="100"
                            value={formData.stock} onChange={handleChange}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <ImageIcon className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight">Pricing & Media</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
                          <input 
                            name="price" type="number" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="500"
                            value={formData.price} onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount Price (₹)</label>
                          <input 
                            name="discountPrice" type="number"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 px-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="450"
                            value={formData.discountPrice} onChange={handleChange}
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Image URL</label>
                       <div className="relative">
                          <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            name="image" required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 pl-14 pr-6 font-black text-slate-900 focus:bg-white focus:border-[var(--primary)] outline-none transition-all placeholder:text-slate-300"
                            placeholder="Paste high-quality URL here"
                            value={formData.image} onChange={handleChange}
                          />
                       </div>
                    </div>
                 </div>

                 <button 
                   type="submit"
                   disabled={loading}
                   className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-200 disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                     <>Confirm & Publish <Plus className="w-5 h-5" /></>
                   )}
                 </button>
              </form>
           </div>

           {/* Sidebar Info */}
           <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--primary)] opacity-10 blur-[80px]"></div>
                 <div className="relative z-10">
                    <Box className="w-10 h-10 text-[var(--primary)] mb-6" />
                    <h3 className="text-xl font-black mb-2 tracking-tight">Listing Tips</h3>
                    <ul className="space-y-4 mt-6">
                       <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                          <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 shrink-0"></div>
                          Use high-resolution transparent PNGs for a premium look.
                       </li>
                       <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                          <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 shrink-0"></div>
                          Keep titles concise and highlight the brand.
                       </li>
                       <li className="flex items-start gap-3 text-xs font-medium text-slate-400">
                          <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 shrink-0"></div>
                          Ensure stock levels are accurate to avoid order cancellations.
                       </li>
                    </ul>
                 </div>
              </div>
              
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 text-center shadow-sm">
                 <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                 <h4 className="font-black text-slate-900 text-sm mb-2">Quality Standards</h4>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                    All products are subject to <br /> quality review before being <br /> live for 8-min delivery.
                 </p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;
