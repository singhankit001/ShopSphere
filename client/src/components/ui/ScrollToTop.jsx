import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Production-grade scroll manager
 * Ensures that every route change and query parameter update 
 * (like category switching) resets the viewport to the top.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Reset scroll to top on ANY route or query change
    // Using 'instant' for route changes to avoid seeing previous page content at the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
