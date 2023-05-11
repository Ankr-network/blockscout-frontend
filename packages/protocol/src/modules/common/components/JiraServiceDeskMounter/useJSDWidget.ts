import { useEffect, useRef } from 'react';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

export const JSD_WIDGET_ID = 'jsd-widget';
const JSD_WIDGET_MOBILE_CLASS_NAME = 'jsd-widget-mobile';
export const JSD_HELP_BUTTON_ID = 'help-button';

const observeWidgetOpeningStyles = () => {
  const target = document.getElementById(JSD_WIDGET_ID);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      if (!target) return;

      if (target.style.height === '100%') {
        target.classList.remove(JSD_WIDGET_MOBILE_CLASS_NAME);
      } else {
        target.classList.add(JSD_WIDGET_MOBILE_CLASS_NAME);
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
      const target = document.getElementById(JSD_WIDGET_ID);
      if (!target) return;

      if (isMobile) {
        target.classList.add(JSD_WIDGET_MOBILE_CLASS_NAME);
      } else {
        target.classList.remove(JSD_WIDGET_MOBILE_CLASS_NAME);
      }
    }, 100);
  }, [isMobile]);
};

const useStyleObserver = (isMobile: boolean) => {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById(JSD_WIDGET_ID);

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
