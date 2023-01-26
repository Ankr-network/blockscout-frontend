import { useEffect, useState } from 'react';

export const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const callback = () => setHeight(window.innerHeight);

    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, []);

  return height;
};
