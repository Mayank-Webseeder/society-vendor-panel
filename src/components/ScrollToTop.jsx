import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Target common scrollable containers in your app
    const scrollContainers = [
      document.querySelector('main'),
      document.querySelector('#child-1'), // Your main content div
      document.querySelector('[id="parent-div"]'),
      document.querySelector('.overflow-auto'),
      document.querySelector('.overflow-y-auto'),
      document.body,
      document.documentElement
    ];

    // Scroll all potential containers to top
    scrollContainers.forEach(container => {
      if (container) {
        container.scrollTop = 0;
        container.scrollLeft = 0;
      }
    });

    // Also try after component renders
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      scrollContainers.forEach(container => {
        if (container) {
          container.scrollTop = 0;
          container.scrollLeft = 0;
        }
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;