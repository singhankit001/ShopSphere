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
      toast.success('Product updated successfully!', {
        style: { borderRadius: '12px', background: '#07142F', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
      });
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-[#F7F8FA]">
       <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-12">
           <button onClick={() => navigate('/admin')} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Edit Product</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Updating ID: #{id.substring(id.length - 8).toUpperCase()}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
                    
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                          <History className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight">Update Information</h3>
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
                     <>Save Changes <Save className="w-5 h-5" /></>
                   )}
                 </button>
              </form>
           </div>

           {/* Sidebar Preview */}
           <div className="space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Live Preview</p>
                 <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                    <img src={formData.image} alt="Preview" className="w-full aspect-square object-contain mb-4" />
                    <h4 className="font-black text-slate-900 text-sm truncate">{formData.name || 'Product Title'}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{formData.brand || 'Brand'}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                       <span className="font-black text-slate-900">₹{formData.discountPrice || formData.price || '0'}</span>
                       {formData.discountPrice && <span className="text-[10px] text-slate-400 line-through">₹{formData.price}</span>}
                    </div>
                 </div>
              </div>
              
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center shadow-2xl shadow-slate-200">
                 <ShieldCheck className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                 <h4 className="font-black text-white text-sm mb-2">Verified Listing</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                    All modifications are logged <br /> for transparency and <br /> quality control.
                 </p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default EditProduct;
