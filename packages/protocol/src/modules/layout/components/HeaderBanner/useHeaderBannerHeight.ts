import { useEffect, useState } from 'react';

import {
  HEADER_BANNER_ID,
  SHOULD_SHOW_HEADER_BANNER,
} from 'modules/layout/const';

export const useHeaderBannerHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const element = document.getElementById(HEADER_BANNER_ID);

      if (element && SHOULD_SHOW_HEADER_BANNER) {
        setHeight(element.offsetHeight);
      }
    };

    setTimeout(() => updateHeight(), 0);
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return height;
};
