import { useCallback } from 'react';

import {
  JSD_HELP_BUTTON_ID,
  JSD_WIDGET_ID,
} from 'modules/common/components/JiraServiceDeskMounter/useJSDWidget';

export const useContactWidget = () => {
  const openContactWidget = useCallback(() => {
    const iframe = document.getElementById(JSD_WIDGET_ID) as HTMLIFrameElement;

    const button = iframe?.contentDocument?.getElementById(JSD_HELP_BUTTON_ID);

    if (button) {
      button.click();
    }
  }, []);

  return { openContactWidget };
};
