import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { SignupDialogWeb3Content } from './SignupDialogWeb3Content';

export interface SignupDialogWeb3ContentContainerProps {
  onClose: () => void;
  onConnect?: () => void | Promise<void>;
  onSuccess?: () => void;
}

export const SignupDialogWeb3ContentContainer = ({
  onClose,
  onConnect,
  onSuccess,
}: SignupDialogWeb3ContentContainerProps) => {
  const { handleConnect: connect } = useAuth();

  const handleConnect = useCallback(
    async data => {
      await onConnect?.();

      const { error } = await connect(data);

      if (!error) {
        onSuccess?.();
      }
    },
    [connect, onConnect, onSuccess],
  );

  return (
    <SignupDialogWeb3Content onConnect={handleConnect} onClose={onClose} />
  );
};
