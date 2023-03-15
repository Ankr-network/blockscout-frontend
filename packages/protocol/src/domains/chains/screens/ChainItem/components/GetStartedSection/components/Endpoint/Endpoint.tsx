import { t } from '@ankr.com/common';

import { CopyToClipIcon, ICopyToClipIconProps } from 'uiKit/CopyToClipIcon';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useEndpointStyles } from './EndpointStyles';

export interface EndpointProps {
  hasConnectWalletMessage: boolean;
  onCopy: ICopyToClipIconProps['onCopy'];
  url: string;
}

export const Endpoint = ({
  hasConnectWalletMessage,
  onCopy,
  url,
}: EndpointProps) => {
  const { classes } = useEndpointStyles();

  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <CopyToClipIcon
        className={classes.copyToClip}
        copyText={hasConnectWalletMessage ? undefined : t('common.copy')}
        hideIcon={hasConnectWalletMessage}
        message={t('common.copy-message')}
        onClick={hasConnectWalletMessage ? onOpen : undefined}
        onCopy={onCopy}
        size="l"
        text={hasConnectWalletMessage ? t('chains.connect-wallet') : url}
        textColor="textPrimary"
      />
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
