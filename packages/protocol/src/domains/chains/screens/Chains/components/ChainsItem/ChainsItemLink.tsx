import { Typography } from '@material-ui/core';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';

interface IChainsItemLinkProps {
  urls: IApiChainURL[];
  dummyMessage: string;
  hasConnectWalletMessage?: boolean;
}

export const ChainsItemLink = ({
  urls,
  dummyMessage,
  hasConnectWalletMessage,
}: IChainsItemLinkProps) => {
  const classes = useStyles(false);

  return (
    <>
      {urls.length <= 1 ? (
        urls.map(({ rpc }) => (
          <CopyToClipIcon
            text={hasConnectWalletMessage ? t('chains.connect-wallet') : rpc}
            message={t('common.copy-message')}
            key={rpc}
            className={classes.copyItem}
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
