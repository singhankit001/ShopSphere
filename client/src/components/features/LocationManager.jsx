import React, { useState, Suspense, lazy } from 'react';
import { MapPin, Navigation, X, ChevronRight, Clock, ShieldCheck, Map as MapIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// 1. LAZY LOAD LEAFLET TO PREVENT MAIN THREAD CRASH
// By using lazy(), Leaflet is only loaded when the user actually switches to the 'map' view.
// This guarantees that the main app (Navbar/Home) will never crash during initial boot.
const MapComponent = lazy(() => import('./MapComponent'));

// LOCAL ERROR BOUNDARY FOR MAP
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Map Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <MapIcon className="w-10 h-10 text-slate-300 mb-4" />
          <p className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Map could not load</p>
          <p className="text-[10px] font-bold text-slate-400 mb-6">Please try again or use current location</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Retry Map
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LocationManager = ({ isOpen, onClose, onLocationSelect }) => {
  const [view, setView] = useState('selection'); // selection | map
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: 26.8467, lng: 80.9462 }); // Default Lucknow
  const [address, setAddress] = useState(null);
  const [eta, setEta] = useState(null);
  const [isDeliverable, setIsDeliverable] = useState(true);

  // Reverse Geocoding logic (doesn't depend on Leaflet)
  const getAddressFromCoords = async (lat, lng) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = res.data;
      
      const area = data.address.suburb || data.address.neighbourhood || data.address.residential || data.address.city_district || 'Unknown Area';
      const city = data.address.city || data.address.town || data.address.state || '';
      
      const formattedAddress = {
        display: `${area}, ${city}`,
        full: data.display_name,
        area,
        city,
        lat,
        lng
      };
      
      setAddress(formattedAddress);
      calculateDeliveryLogic(lat, lng);
      return formattedAddress;
    } catch (err) {
      console.error("Geocoding error", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDeliveryLogic = (lat, lng) => {
    const storeCoords = { lat: 26.8467, lng: 80.9462 };
    const dist = Math.sqrt(Math.pow(lat - storeCoords.lat, 2) + Math.pow(lng - storeCoords.lng, 2)) * 111; 
    
    if (dist > 30) { 
      setIsDeliverable(false);
      setEta(null);
    } else {
      setIsDeliverable(true);
      const baseTime = 8;
      const travelTime = Math.round(dist * 1.5);
      setEta(baseTime + travelTime);
    }
  };

  const handleAutoLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        const addr = await getAddressFromCoords(latitude, longitude);
        if (addr) {
          handleConfirm(addr);
        }
      },
      () => {
        setLoading(false);
        alert("Location access denied. Please select manually.");
      }
    );
  };

  const handleConfirm = (finalAddr) => {
    const data = finalAddr || address;
    const finalData = { ...data, eta, isDeliverable };
    localStorage.setItem('shopsphere_location', JSON.stringify(finalData));
    onLocationSelect(finalData);
    setView('selection'); // Reset view for next open
    onClose();
  };

  const handleClose = () => {
    setView('selection');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden m-4"
          >
            <div className="p-10 border-b border-slate-50 flex items-start justify-between gap-6">
              <div className="pr-12">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Delivery Location</h2>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 leading-relaxed">Where do you want your order delivered today?</p>
              </div>
              <button 
                onClick={handleClose} 
                className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full transition-all shrink-0 group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="p-10">
              {view === 'selection' && (
                <div className="space-y-4">
                  <button 
                    onClick={handleAutoLocation}
                    disabled={loading}
                    className="w-full group flex items-center gap-4 p-5 bg-[#10B981] text-white rounded-[24px] shadow-lg shadow-green-100 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Navigation className="w-6 h-6 fill-current" />}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black uppercase tracking-wider">Use Current Location</p>
                      <p className="text-xs font-bold text-white/80">Using GPS for better accuracy</p>
                    </div>
                    <ChevronRight className="ml-auto w-5 h-5 opacity-50" />
                  </button>

                  <div className="relative flex items-center gap-4 py-4">
                    <div className="h-px bg-slate-100 flex-1"></div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">or choose on map</span>
                    <div className="h-px bg-slate-100 flex-1"></div>
                  </div>

                  <button 
                    onClick={() => { setView('map'); getAddressFromCoords(coords.lat, coords.lng); }}
                    className="w-full flex items-center gap-4 p-5 border-2 border-slate-50 hover:border-slate-200 rounded-[24px] transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-wider">Select manually on map</p>
                      <p className="text-xs font-bold text-slate-400">Drag & drop pin for precise location</p>
                    </div>
                    <ChevronRight className="ml-auto w-5 h-5 text-slate-300" />
                  </button>
                </div>
              )}

              {view === 'map' && (
                <div className="space-y-6">
                  <div className="h-[300px] w-full rounded-[32px] overflow-hidden border-4 border-slate-50 relative">
                    <MapErrorBoundary>
                      <Suspense fallback={
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                        </div>
                      }>
                        <MapComponent 
                          key={isOpen ? 'map-open' : 'map-closed'}
                          coords={coords} 
                          onCoordsChange={(newCoords) => {
                            setCoords(newCoords);
                            getAddressFromCoords(newCoords.lat, newCoords.lng);
                          }} 
                        />
                      </Suspense>
                    </MapErrorBoundary>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1000]">
                       <div className="w-4 h-4 bg-[#10B981] rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[28px]">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#10B981] shadow-sm shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confirm Address</p>
                        <p className="text-sm font-bold text-slate-900 line-clamp-2">
                          {loading ? 'Detecting...' : (address?.full || 'Unknown Location')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-4">
                       <div className={`flex-1 px-4 py-3 rounded-xl flex items-center gap-3 ${isDeliverable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {isDeliverable ? (
                            <>
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-black uppercase tracking-wider">Delivery in {eta} mins</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-4 h-4" />
                              <span className="text-xs font-black uppercase tracking-wider">Area not serviceable</span>
                            </>
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => setView('selection')}
                      className="flex-1 h-16 bg-slate-50 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                    >
                      Change Method
                    </button>
                    <button 
                      disabled={!isDeliverable || loading}
                      onClick={() => handleConfirm()}
                      className="flex-[2] h-16 bg-[#10B981] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0E9F6E] transition-all disabled:opacity-50 shadow-xl shadow-green-100"
                    >
                      Confirm Location
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LocationManager;
