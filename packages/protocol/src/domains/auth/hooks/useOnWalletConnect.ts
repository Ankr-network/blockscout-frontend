import { useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

export const useOnWalletConnect = (callback: () => void) => {
  const { isWalletConnected } = useAuth();

  const previousIsWalletConnected = useRef<boolean>(isWalletConnected);

  useEffect(() => {
    if (!previousIsWalletConnected.current && isWalletConnected) callback();

    previousIsWalletConnected.current = isWalletConnected;
  }, [callback, isWalletConnected]);
};
