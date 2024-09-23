// hooks/useIsMobile.ts
import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 425);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
