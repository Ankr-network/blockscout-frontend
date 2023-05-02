import { ButtonTypeMap } from '@mui/material';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { ConnectedButton } from './ConnectedButton';
import { UnconnectedButton } from './UnconnectedButton';

interface ConnectButtonProps {
  isMobile?: boolean;
  variant?: ButtonTypeMap['props']['variant'];
  buttonText?: string;
  onOpen?: () => void;
  onSuccess?: () => void;
  className?: string;
}

export const ConnectButton = ({
  isMobile = false,
  variant = 'text',
  buttonText,
  onOpen,
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
      onOpen={onOpen}
      onSuccess={onSuccess}
      className={className}
    />
  );
};
