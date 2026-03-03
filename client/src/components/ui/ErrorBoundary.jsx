import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-red-100">
             <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Oops! Something went wrong.</h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
            {this.state.error?.message || "We encountered an unexpected error while loading this page."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[var(--primary-dark)] transition-all shadow-lg"
          >
            <RefreshCcw className="w-5 h-5" /> Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
