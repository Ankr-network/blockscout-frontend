import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { CopyToClipIcon, ICopyToClipIconProps } from 'uiKit/CopyToClipIcon';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useAppSelector } from 'store/useAppSelector';
import { selectHasPrivateAccess } from 'domains/auth/store';

import { useEndpointStyles } from './EndpointStyles';

export interface EndpointProps {
  hasConnectWalletMessage: boolean;
  onCopy: ICopyToClipIconProps['onCopy'];
  url: string;
}

const URL_DIVIDER_SYMBOL = '/';

export const Endpoint = ({
  hasConnectWalletMessage,
  onCopy,
  url,
}: EndpointProps) => {
  const { classes } = useEndpointStyles();

  const { isOpened, onOpen, onClose } = useDialog();

  const hasPrivateAccess = useAppSelector(selectHasPrivateAccess);

  const textLabel = useMemo(() => {
    if (hasConnectWalletMessage) {
      return t('chains.connect-wallet');
    }

    if (!hasPrivateAccess) {
      return url;
    }

    const splittedUrl = url.split(URL_DIVIDER_SYMBOL);

    return splittedUrl
      .map((value, index) => {
        if (index === splittedUrl.length - 1) {
          return shrinkAddress(value);
        }

        return value;
      })
      .join(URL_DIVIDER_SYMBOL);
  }, [hasConnectWalletMessage, hasPrivateAccess, url]);

  return (
    <>
      <CopyToClipIcon
        className={classes.copyToClip}
        hideIcon={hasConnectWalletMessage}
        message={t('common.copy-message')}
        onClick={hasConnectWalletMessage ? onOpen : undefined}
        onCopy={onCopy}
        size="l"
        text={hasConnectWalletMessage ? t('chains.connect-wallet') : url}
        textLabel={textLabel}
        textColor="textSecondary"
      />
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
