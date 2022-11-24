import { ButtonTypeMap } from '@material-ui/core';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { ConnectedButton } from './ConnectedButton';
import { UnconnectedButton } from './UnconnectedButton';

interface ConnectButtonProps {
  isMobile?: boolean;
  variant?: ButtonTypeMap['props']['variant'];
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ConnectButton = ({
  isMobile = false,
  variant = 'text',
  buttonText,
  onSuccess,
  className,
}: ConnectButtonProps) => {
  const { hasWeb3Connection } = useAuth();

  if (hasWeb3Connection) {
    return <ConnectedButton isMobile={isMobile} />;
  }

  return (
    <UnconnectedButton
      variant={variant}
      buttonText={buttonText}
      onSuccess={onSuccess}
      className={className}
    />
  );
};
