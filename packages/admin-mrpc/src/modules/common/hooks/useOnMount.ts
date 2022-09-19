import { useEffect } from 'react';

type CallBack = () => Promise<void> | void;

export function useOnMount(callback: CallBack) {
  useEffect(() => {
    if (typeof callback !== 'function') return;

    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
