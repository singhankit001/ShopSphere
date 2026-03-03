import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Bike, Boxes, CheckCircle2, Database, Edit, 
  IndianRupee, LayoutDashboard, PackagePlus, Search, 
  ShoppingBag, Trash2, TrendingUp, Clock, User, Plus
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  deleteManagedProduct, getCatalogProducts, getManagedProducts, 
  getStoredOrders, orderStatuses, updateStoredOrderStatus, 
  upsertManagedProduct, upsertStoredOrder 
} from '../utils/commerceStorage';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Boxes },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
];

const blankProduct = {
  name: '',
  brand: 'ShopSphere',
  category: 'Fruits & Vegetables',
  categorySlug: 'fruits-vegetables',
  weight: '500g',
  price: '',
  discountPrice: '',
  stock: '50',
  image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=40&w=400',
  deliveryTime: '10'
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState(getStoredOrders());
  const [products, setProducts] = useState(getCatalogProducts());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [productForm, setProductForm] = useState(blankProduct);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const loadAdminData = async () => {
      try {
        const [orderRes, productRes] = await Promise.allSettled([
          axios.get('http://localhost:5001/api/orders', { headers: { Authorization: `Bearer ${user.token}` } }),
          axios.get('http://localhost:5001/api/products')
        ]);
        if (orderRes.status === 'fulfilled') {
          orderRes.value.data.forEach((order) => upsertStoredOrder(order));
        }
        const backendProducts = productRes.status === 'fulfilled'
          ? (Array.isArray(productRes.value.data.products) ? productRes.value.data.products : productRes.value.data)
          : [];
        setOrders(getStoredOrders());
        setProducts([...getManagedProducts(), ...(Array.isArray(backendProducts) && backendProducts.length ? backendProducts : getCatalogProducts())]);
      } catch {
        setOrders(getStoredOrders());
        setProducts(getCatalogProducts());
      }
    };

    loadAdminData();
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    const activeDeliveries = orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.orderStatus)).length;
    const topProducts = {};
    orders.forEach((order) => {
      order.items?.forEach((item) => {
        topProducts[item.name] = (topProducts[item.name] || 0) + item.quantity;
      });
    });
    const topProduct = Object.entries(topProducts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No orders yet';
    return {
      totalOrders: orders.length,
      revenue,
      activeDeliveries,
      topProduct,
      activeItems: products.filter((product) => Number(product.stock ?? 50) > 0).length
    };
  }, [orders, products]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
    const text = `${order.orderId} ${order.user?.name || ''} ${order.paymentMethod}`.toLowerCase();
    return matchesStatus && text.includes(query.toLowerCase());
  });

  const filteredProducts = products.filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase()));

  const revenueByDay = useMemo(() => {
    const groups = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const key = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      groups[key] = (groups[key] || 0) + Number(order.totalAmount || 0);
    });
    return Object.entries(groups).slice(-7);
  }, [orders]);

  const changeOrderStatus = async (order, status) => {
    const nextOrders = updateStoredOrderStatus(order._id || order.orderId, status);
    setOrders(nextOrders);
    if (user?.token && !String(order._id).startsWith('local-')) {
      try {
        await axios.put(`http://localhost:5001/api/orders/${order._id}`, { status }, { headers: { Authorization: `Bearer ${user.token}` } });
        toast.success(`Order ${status}`);
      } catch {
        toast('Status saved locally.');
      }
    }
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const saved = upsertManagedProduct(productForm);
    setProducts(getCatalogProducts());
    setProductForm(blankProduct);
    toast.success(`${saved.name} added!`);
  };

  const removeProduct = (product) => {
    deleteManagedProduct(product._id);
    setProducts(getCatalogProducts());
    toast.success('Product removed');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-emerald-500 opacity-5 blur-[100px] pointer-events-none"></div>
               <div className="relative z-10 p-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">ShopSphere Engine</p>
                 <h1 className="text-3xl font-black tracking-tight font-premium">Admin Console</h1>
                 
                 <div className="mt-8 space-y-2">
                   {tabs.map((tab) => (
                     <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)} 
                      className={`w-full h-14 px-5 rounded-[20px] flex items-center gap-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-white/5'}`}
                     >
                       <tab.icon className="w-4 h-4" /> {tab.label}
                     </button>
                   ))}
                 </div>

                 <Link 
                  to="/admin/add-product" 
                  className="mt-8 h-14 bg-white text-slate-900 rounded-[20px] flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                 >
                   <Plus className="w-4 h-4" /> New Product
                 </Link>
               </div>
            </div>

            {/* Rider Status Tracking */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest">Riders Active</h4>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center"><Bike className="w-4 h-4 text-slate-400" /></div>
                       <div className="flex-1 min-w-0"><div className="h-2 w-2/3 bg-slate-50 rounded-full mb-1"></div><div className="h-1.5 w-1/3 bg-slate-50 rounded-full"></div></div>
                    </div>
                  ))}
               </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-premium"
                >
                  Operations Control
                </motion.h2>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Managing {metrics.totalOrders} total orders & {metrics.activeItems} products</p>
              </div>
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  placeholder="Global search..." 
                  className="w-full h-14 rounded-[20px] bg-white border border-slate-100 pl-12 pr-6 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 shadow-sm transition-all" 
                />
              </div>
            </div>

            {/* Dashboard View */}
            {(activeTab === 'dashboard' || activeTab === 'analytics') && (
              <div className="space-y-10">
                {/* Metrics Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[
                    { label: 'Revenue', value: `₹${metrics.revenue.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Orders', value: metrics.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active', value: metrics.activeDeliveries, icon: Bike, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'In Stock', value: metrics.activeItems, icon: Database, color: 'text-violet-600', bg: 'bg-violet-50' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between group hover:-translate-y-1 transition-all hover:border-emerald-100"
                    >
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}><item.icon className="w-6 h-6" /></div>
                    </motion.div>
                  ))}
                </section>

                {/* Analytics Section */}
                <section className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
                  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500 opacity-[0.02] blur-[100px] pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-12 relative z-10">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 font-premium">Revenue Velocity</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Net performance over last 7 days</p>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        <TrendingUp className="w-4 h-4" /> Healthy
                      </div>
                    </div>
                    <div className="h-72 flex items-end gap-6 relative z-10 px-4">
                      {revenueByDay.map(([day, value]) => {
                        const max = Math.max(...revenueByDay.map(([, amount]) => amount), 1);
                        const height = Math.max(12, (value / max) * 100);
                        return (
                          <div key={day} className="flex-1 flex flex-col items-center gap-4 group">
                            <div className="w-full h-56 flex items-end">
                               <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`w-full rounded-[14px] bg-emerald-500 group-hover:bg-emerald-600 transition-colors relative shadow-lg shadow-emerald-500/10`}
                               >
                                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹{value}</div>
                               </motion.div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-2xl font-black text-slate-900 font-premium">Top Categories</h3>
                    <div className="space-y-6">
                      {[
                        { name: 'Fruits & Vegetables', value: 85, color: 'bg-emerald-500' },
                        { name: 'Dairy & Eggs', value: 72, color: 'bg-blue-500' },
                        { name: 'Snacks', value: 58, color: 'bg-amber-500' },
                        { name: 'Instant Food', value: 45, color: 'bg-violet-500' }
                      ].map((cat) => (
                        <div key={cat.name} className="space-y-3">
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-900">
                             <span>{cat.name}</span>
                             <span className="text-slate-400">{cat.value}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                             <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.value}%` }}
                              className={`h-full ${cat.color} rounded-full`}
                             />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 className="w-20 h-20 text-emerald-500" /></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Bestselling SKU</p>
                      <h4 className="text-xl font-black text-slate-900 truncate pr-12">{metrics.topProduct}</h4>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Orders View */}
            {(activeTab === 'dashboard' || activeTab === 'orders') && (
              <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-premium">Live Orders</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Real-time fulfillment tracking</p>
                  </div>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="h-12 bg-slate-50 border border-slate-100 rounded-xl px-6 font-black text-[11px] uppercase tracking-widest outline-none focus:border-emerald-500 cursor-pointer transition-all"
                  >
                    {['All', ...orderStatuses].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
                <div className="divide-y divide-slate-50">
                  {filteredOrders.length === 0 ? (
                    <div className="p-20 text-center text-slate-300 font-bold flex flex-col items-center gap-4">
                       <ShoppingBag className="w-12 h-12 opacity-10" />
                       No operations data found.
                    </div>
                  ) : filteredOrders.map((order) => (
                    <div key={order._id || order.orderId} className="p-8 grid grid-cols-1 xl:grid-cols-[1fr_200px_240px] gap-8 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="flex gap-6 items-start">
                         <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0 font-black text-xs shadow-sm shadow-emerald-100">#</div>
                         <div className="min-w-0">
                            <p className="font-black text-slate-900 text-lg mb-1">{order.orderId}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                               <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><PackagePlus className="w-3.5 h-3.5" /> {order.items?.length || 0} SKUs</p>
                               <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5" /> ₹{order.totalAmount}</p>
                               <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {order.user?.name || 'Guest User'}</p>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">{order.orderStatus}</span>
                         </div>
                         <p className="text-[9px] font-bold text-slate-400 truncate max-w-[180px]">{order.address?.street || order.shippingAddress?.street}</p>
                      </div>

                      <select 
                        value={order.orderStatus} 
                        onChange={(e) => changeOrderStatus(order, e.target.value)} 
                        className="h-12 bg-white border border-slate-100 rounded-xl px-5 font-black text-[10px] uppercase tracking-widest outline-none focus:border-emerald-500 shadow-sm cursor-pointer transition-all hover:border-emerald-200"
                      >
                        {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Products View */}
            {(activeTab === 'products') && (
              <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
                {/* Quick Add Form */}
                <form onSubmit={saveProduct} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm h-fit space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-premium">Quick SKU</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Instantly add items to catalog</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      ['name', 'Product Name'],
                      ['brand', 'Brand Identity'],
                      ['category', 'Retail Category'],
                      ['weight', 'Weight / Unit'],
                      ['price', 'Base Price (₹)'],
                      ['stock', 'Inventory Level'],
                      ['image', 'Direct Image URL']
                    ].map(([key, label]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 block">{label}</label>
                        <input 
                          required 
                          value={productForm[key] || ''} 
                          onChange={(e) => setProductForm({ ...productForm, [key]: e.target.value })} 
                          className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                        />
                      </div>
                    ))}
                  </div>

                  <button className="w-full h-14 bg-emerald-500 text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-emerald-600 shadow-xl shadow-emerald-100 transition-all active:scale-95">
                    <PackagePlus className="w-5 h-5" /> Deploy SKU
                  </button>
                </form>

                {/* SKU List */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-premium">Inventory Registry</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{filteredProducts.length} unique products</p>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-50 max-h-[800px] overflow-auto custom-scrollbar">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="p-8 flex items-center gap-6 hover:bg-slate-50/50 transition-colors">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                           <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 text-lg truncate mb-1">{product.name}</p>
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{product.brand}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                             <span className={`text-[10px] font-bold uppercase tracking-widest ${Number(product.stock) < 10 ? 'text-red-500' : 'text-slate-300'}`}>• Stock {product.stock ?? 50}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-slate-900 text-lg">₹{product.discountPrice || product.price}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Per {product.weight}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                           <Link to={`/admin/edit-product/${product._id}`} className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:text-emerald-500 hover:border-emerald-100 shadow-sm transition-all"><Edit className="w-5 h-5" /></Link>
                           <button onClick={() => removeProduct(product)} className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:text-red-500 hover:border-red-100 shadow-sm transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
