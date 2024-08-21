import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { ENTERPRISE_API_KEY_QUERY_PARAM } from 'multirpc-sdk';

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
const ENTERPRISE_URL_DIVIDER_SYMBOL = `${ENTERPRISE_API_KEY_QUERY_PARAM}=`;

export const Endpoint = ({
  hasConnectWalletMessage,
  onCopy,
  url,
}: EndpointProps) => {
  const { classes } = useEndpointStyles();

  const { isOpened, onClose, onOpen } = useDialog();

  const hasPrivateAccess = useAppSelector(selectHasPrivateAccess);

  const textLabel = useMemo(() => {
    if (hasConnectWalletMessage) {
      return t('chains.connect-wallet');
    }

    if (!hasPrivateAccess) {
      return url;
    }

    const isEnterpriseEndpoint = url.includes(ENTERPRISE_URL_DIVIDER_SYMBOL);
    const divider = isEnterpriseEndpoint
      ? ENTERPRISE_URL_DIVIDER_SYMBOL
      : URL_DIVIDER_SYMBOL;

    const splittedUrl = url.split(divider);

    return splittedUrl
      .map((value, index) => {
        const lastItemIndex = splittedUrl.length - 1;

        if (index === lastItemIndex) {
          return shrinkAddress(value);
        }

        return value;
      })
      .join(divider);
  }, [hasConnectWalletMessage, hasPrivateAccess, url]);

  return (
    <>
      <CopyToClipIcon
        contentClassName={classes.copyToClipContent}
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
