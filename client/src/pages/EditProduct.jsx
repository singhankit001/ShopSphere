import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Sparkles, Box, ShieldCheck, History } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const EditProduct = () => {
  const { id } = useParams();
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
  const [fetching, setFetching] = useState(true);
  
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setFetching(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/products/${id}`),
          axios.get('http://localhost:5001/api/categories')
        ]);
        
        const prod = prodRes.data;
        setFormData({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          discountPrice: prod.discountPrice || '',
          category: prod.category?._id || prod.category || '',
          stock: prod.stock,
          image: prod.image,
          brand: prod.brand,
          deliveryTime: prod.deliveryTime || '8 min',
          weight: prod.weight || ''
        });
        setCategories(catRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setFetching(false), 500);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id, user, navigate]);

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
      await axios.put(`http://localhost:5001/api/products/${id}`, formData, config);
      toast.success('SKU updated successfully!', {
        style: { borderRadius: '12px', background: '#10B981', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-[#FDFDFD]">
       <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );

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
              <h1 className="text-4xl font-black text-slate-900 tracking-tight font-premium">Edit SKU</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Refining item: {id.substring(id.length - 8).toUpperCase()}</p>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                 {/* Section 1: Update Info */}
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8"
                 >
                    <div className="flex items-center gap-4 mb-2">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                          <History className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight font-premium">Update Metadata</h3>
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
                         placeholder="Update product details..."
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
                       <h3 className="text-xl font-black text-slate-900 tracking-tight font-premium">Pricing & Assets</h3>
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
                     <>Update Product <Save className="w-6 h-6" /></>
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
                    <div className="w-full aspect-square bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center justify-center">
                       <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{formData.name || 'Untitled Product'}</h4>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{formData.brand || 'Brand'}</p>
                    
                    <div className="mt-6 flex items-baseline gap-3">
                       <span className="text-2xl font-black text-slate-900">₹{formData.discountPrice || formData.price || '0'}</span>
                       {formData.discountPrice && <span className="text-sm text-slate-300 line-through font-bold">₹{formData.price}</span>}
                    </div>
                 </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900 rounded-[2.5rem] p-10 text-white text-center shadow-2xl"
              >
                 <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                 </div>
                 <h4 className="font-black text-white text-lg mb-2 font-premium">Verified Update</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-loose">
                    Changes are instantly <br /> propagated to the <br /> 8-min delivery network.
                 </p>
              </motion.div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default EditProduct;
