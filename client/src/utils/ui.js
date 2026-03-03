import toast from 'react-hot-toast';

/**
 * Global handler for unimplemented features to show a "Coming Soon" message.
 * @param {Event} e - The event object to prevent default behavior and propagation.
 * @param {string} featureName - Optional name of the feature to display in the toast.
 */
export const handleComingSoon = (e, featureName = 'This feature') => {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  
  toast.dismiss(); // Dismiss existing toasts to avoid stacking
  toast('🚧 ' + featureName + ' is coming soon', {
    duration: 3000,
    position: 'bottom-center',
    style: {
      background: '#0F172A',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      borderRadius: '16px',
      padding: '16px 24px',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
  });
};
