import { Typography } from '@material-ui/core';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { t } from 'modules/i18n/utils/intl';
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
  const classes = useChainsItemStyles(false);

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
