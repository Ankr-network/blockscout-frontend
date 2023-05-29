import { SignupDialogWeb3Content } from './SignupDialogWeb3Content';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCallback } from 'react';

export interface SignupDialogWeb3ContentContainerProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const SignupDialogWeb3ContentContainer = ({
  onClose,
  onSuccess,
}: SignupDialogWeb3ContentContainerProps) => {
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

  return <SignupDialogWeb3Content onConnect={onConnect} onClose={onClose} />;
};
