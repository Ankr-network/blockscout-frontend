import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainType, ChainURL } from 'domains/chains/types';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useChainsItemLinkStyles } from './useChainsItemLinkStyles';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';

interface IChainsItemLinkProps {
  chainType: ChainType;
  dummyMessage: string;
  hasConnectWalletMessage?: boolean;
  onConnectWallet?: () => void;
  urls: ChainURL[];
}

export const ChainsItemLink = ({
  chainType,
  dummyMessage,
  hasConnectWalletMessage,
  onConnectWallet,
  urls,
}: IChainsItemLinkProps) => {
  const { classes } = useChainsItemLinkStyles();

  const onCopyEndpoint = useCopyEndpointHandler(chainType);

  return (
    <>
      {urls.length <= 1 ? (
        urls.map(({ rpc }) => (
          <CopyToClipIcon
            hideIcon={hasConnectWalletMessage}
            key={rpc}
            message={t('common.copy-message')}
            onClick={hasConnectWalletMessage ? onConnectWallet : undefined}
            onCopy={onCopyEndpoint}
            text={hasConnectWalletMessage ? t('chains.connect-wallet') : rpc}
          />
        ))
      ) : (
        <Typography
          className={classes.dummy}
          color="textSecondary"
          noWrap
          variant="body2"
        >
          {dummyMessage}
        </Typography>
      )}
    </>
  );
};
