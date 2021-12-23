import { currentEnv } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { useEffect } from 'react';

/**
 * Component for react-error-overlay [issue](https://github.com/facebook/create-react-app/issues/11773) fix
 */
export const DevOverlayFix = () => {
  useEffect(() => {
    if (currentEnv === Env.Production) {
      return;
    }
    const css = 'body > iframe { display: none !important }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.setAttribute('data-meta', 'DevOverlayFix');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }, []);

  return null;
};
