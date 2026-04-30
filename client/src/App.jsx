import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/common/Layout';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/ui/ScrollToTop';
import { Careers, Blog, Press, 
  HelpCenter, Safety, Privacy, Terms, Contact 
} from './pages/StaticPages';
import About from './pages/About';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';
import OrdersPage from './pages/Orders';
import OrderTrackingPage from './pages/OrderTracking';
import { products } from './data/shopData';

// Protected Route Component
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Lazy load main pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const EditProduct = lazy(() => import('./pages/EditProduct'));
const Profile = lazy(() => import('./pages/Profile'));
const Products = lazy(() => import('./pages/Products'));
const Categories = lazy(() => import('./pages/Categories'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-slate-50 border-t-emerald-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl animate-pulse"></div>
      </div>
    </div>
    <p className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Initializing ShopSphere</p>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    
    // Dev-only Catalog Validation
    if (import.meta.env.DEV) {
      products.forEach(p => {
        const isPlaceholder = p.image?.includes('placeholder');
        const isLocalAsset = p.image?.startsWith('/assets/products/');
        const slugMatch = p.image?.includes(p.slug);

        if (isPlaceholder) {
          console.warn(`[Catalog Integrity] SKU "${p.name}" is using a placeholder image.`);
        } else if (isLocalAsset && !slugMatch) {
          console.error(`[Catalog Integrity] Mismatch: Product "${p.name}" has slug "${p.slug}" but uses image "${p.image}"`);
        } else if (!isLocalAsset && !p.image?.startsWith('http')) {
          console.warn(`[Catalog Integrity] SKU "${p.name}" has non-standard image path: ${p.image}`);
        }
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <Layout>
          <Toaster position="bottom-center" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderTrackingPage />} />
              <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/add-product" element={<PrivateRoute adminOnly={true}><AddProduct /></PrivateRoute>} />
              <Route path="/admin/edit-product/:id" element={<PrivateRoute adminOnly={true}><EditProduct /></PrivateRoute>} />
              
              {/* Static Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/press" element={<Press />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<div className="pt-32 pb-20 text-center">404 - Not Found</div>} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
