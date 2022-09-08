import { useEffect, useRef } from 'react';

import { useIsSMDown } from 'ui';

const observeWidgetOpeningStyles = () => {
  const target = document.getElementById('jsd-widget');

  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      if (!target) return;

      if (target.style.height === '100%') {
        target.classList.remove('jsd-widget-mobile');
      } else {
        target.classList.add('jsd-widget-mobile');
      }
    });
  });

  if (target) {
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
  }

  return observer;
};

const useMobileStyles = (isMobile: boolean) => {
  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById('jsd-widget');
      if (!target) return;

      if (isMobile) {
        target.classList.add('jsd-widget-mobile');
      } else {
        target.classList.remove('jsd-widget-mobile');
      }
    }, 100);
  }, [isMobile]);
};

const useStyleObserver = (isMobile: boolean) => {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById('jsd-widget');

      if (observer.current) {
        observer.current.disconnect();
      }

      if (target && isMobile) {
        observer.current = observeWidgetOpeningStyles();
      }
    }, 100);
  }, [isMobile]);
};

export const useJSDWidget = () => {
  const isMobile = useIsSMDown();

  useMobileStyles(isMobile);
  useStyleObserver(isMobile);
};
