import { useEffect } from 'react';

import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';

type CallBack = () => Promise<void> | void;

export function useOnMount(callback: CallBack) {
  useEffect(() => {
    if (typeof callback !== 'function') return;

    if (!IS_REACT_SNAP) {
      callback();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
