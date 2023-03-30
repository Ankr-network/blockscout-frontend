import { useEffect } from 'react';

import { getIsReactSnap } from '../utils/getIsReactSnap';

const widgetKey = process.env.REACT_APP_ATLASSIAN_WIDGET_KEY as string;

export const useJiraServiceDesk = (): void => {
  useEffect(() => {
    let script: HTMLScriptElement;
    const isReactSnap = getIsReactSnap();

    if (!isReactSnap) {
      script = document.createElement('script');

      script.src = 'https://jsd-widget.atlassian.com/assets/embed.js';
      script.id = 'jiraWidget';
      script.setAttribute('async', '');
      script.setAttribute('data-jsd-embedded', '');
      script.setAttribute('data-key', widgetKey);
      script.setAttribute('data-base-url', 'https://jsd-widget.atlassian.com');

      document.body.appendChild(script);

      script.addEventListener('load', () => {
        window.document.dispatchEvent(
          new Event('DOMContentLoaded', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
    }

    return () => {
      if (!isReactSnap) {
        document.body.removeChild(script);
      }
    };
  }, []);
};
