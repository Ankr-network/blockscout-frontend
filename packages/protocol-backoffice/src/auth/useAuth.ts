import { useCallback } from 'react';
import { useAuthStore } from 'stores/AuthStore';
import { getSavedToken } from './connect';

export const useAuth = () => {
  const { isLoading, connect, disconnect, address } = useAuthStore();

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleAutoConnect = useCallback(() => {
    const authorizationToken = getSavedToken();

    if (authorizationToken) {
      handleConnect();
    }
  }, [handleConnect]);

  return {
    handleConnect,
    handleDisconnect,
    handleAutoConnect,
    isLoading,
    address,
  };
};
