import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Edit, Trash2, Package, Search, ChevronRight, LayoutDashboard, Database, TrendingUp, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchProducts();
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5001/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`http://localhost:5001/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-[#F7F8FA]">
       <div className="w-10 h-10 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Admin Control</h1>
            <div className="flex items-center gap-2 mt-2">
               <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-black uppercase">v2.0 PRO</span>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Real-time Inventory Management</p>
            </div>
          </div>
          <Link to="/admin/add-product" className="px-10 py-4.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3 text-xs uppercase tracking-widest">
            <Plus className="w-5 h-5" /> Add New Item
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Total Inventory', value: products.length, icon: Database, color: 'bg-blue-50 text-blue-600' },
             { label: 'Active Items', value: products.filter(p => p.stock > 0).length, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
             { label: 'Low Stock Alerts', value: products.filter(p => p.stock < 10).length, icon: AlertCircle, color: 'bg-red-50 text-red-600' }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between"
             >
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                   <stat.icon className="w-7 h-7" />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row gap-6 items-center justify-between">
             <div className="relative w-full md:w-96 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by name, brand or category..."
                  className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:border-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button onClick={fetchProducts} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">Refresh Data</button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="px-10 py-6">Product Details</th>
                  <th className="px-10 py-6">Pricing</th>
                  <th className="px-10 py-6">Inventory Status</th>
                  <th className="px-10 py-6 text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-50 p-2 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                           <img src={product.image} className="w-full h-full object-contain" alt="" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 text-base leading-tight truncate">{product.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
                             <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div>
                        <p className="font-black text-slate-900 text-lg tracking-tight">₹{product.discountPrice || product.price}</p>
                        {product.discountPrice && (
                           <p className="text-[10px] text-slate-400 line-through font-bold mt-1">₹{product.price}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                         <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                         <span className="font-black text-slate-900 text-xs">{product.stock} Units Left</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/admin/edit-product/${product._id}`} 
                          className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all shadow-lg shadow-slate-200"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product._id)}
                          className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="p-24 text-center">
               <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-slate-200" />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-2">No items found</h3>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
