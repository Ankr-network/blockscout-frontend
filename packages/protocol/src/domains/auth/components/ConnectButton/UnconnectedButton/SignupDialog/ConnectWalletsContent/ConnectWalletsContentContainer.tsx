import { ConnectWalletsContent } from './ConnectWalletsContent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCallback } from 'react';

export interface ConnectWalletsContentContainerProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const ConnectWalletsContentContainer = ({
  onClose,
  onSuccess,
}: ConnectWalletsContentContainerProps) => {
  const { handleConnect } = useAuth();

  const onConnect = useCallback(
    async data => {
      const { error } = await handleConnect(data);

      if (typeof onSuccess === 'function' && !error) {
        onSuccess();
      }
    },
    [handleConnect, onSuccess],
  );

  return <ConnectWalletsContent onConnect={onConnect} onClose={onClose} />;
};
