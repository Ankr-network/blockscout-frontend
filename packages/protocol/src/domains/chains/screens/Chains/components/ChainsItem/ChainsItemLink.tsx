import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainType } from 'domains/chains/types';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { useChainsItemStyles } from './useChainsItemStyles';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';

interface IChainsItemLinkProps {
  chainType: ChainType;
  dummyMessage: string;
  hasConnectWalletMessage?: boolean;
  onConnectWallet?: () => void;
  urls: IApiChainURL[];
}

export const ChainsItemLink = ({
  chainType,
  dummyMessage,
  hasConnectWalletMessage,
  onConnectWallet,
  urls,
}: IChainsItemLinkProps) => {
  const { classes } = useChainsItemStyles(false);

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
