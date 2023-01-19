import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { IApiChainURL } from 'domains/chains/api/queryChains';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useChainsItemStyles } from './useChainsItemStyles';

interface IChainsItemLinkProps {
  urls: IApiChainURL[];
  dummyMessage: string;
  hasConnectWalletMessage?: boolean;
  onConnectWallet?: () => void;
}

export const ChainsItemLink = ({
  urls,
  dummyMessage,
  hasConnectWalletMessage,
  onConnectWallet,
}: IChainsItemLinkProps) => {
  const { classes } = useChainsItemStyles(false);

  return (
    <>
      {urls.length <= 1 ? (
        urls.map(({ rpc }) => (
          <CopyToClipIcon
            key={rpc}
            message={t('common.copy-message')}
            text={hasConnectWalletMessage ? t('chains.connect-wallet') : rpc}
            hideIcon={hasConnectWalletMessage}
            onClick={hasConnectWalletMessage ? onConnectWallet : undefined}
          />
        ))
      ) : (
        <Typography
          className={classes.dummy}
          variant="body2"
          noWrap
          color="textSecondary"
        >
          {dummyMessage}
        </Typography>
      )}
    </>
  );
};
