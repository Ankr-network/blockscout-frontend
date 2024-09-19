import { Typography } from '@mui/material';
import { ADVANCED_API_CHAINS } from '@ankr.com/chains-list';

import { ChainItem } from 'modules/chains/components/ChainItem';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { supportedNetworksTranslation } from './translation';
import { useAdvancedApiSupportedNetworksStyles } from './useAdvancedApiSupportedNetworksStyles';

export const AdvancedApiSupportedNetworks = () => {
  const { classes } = useAdvancedApiSupportedNetworksStyles();

  const { keys, t } = useTranslation(supportedNetworksTranslation);

  return (
    <div className={classes.supportedNetworksWrapper}>
      <div className={classes.supportedNetworksList}>
        <Typography className={classes.tabContentTitle} variant="subtitle3">
          {t(keys.mainnets)}
        </Typography>
        <div className={classes.supportedChainsList}>
          {ADVANCED_API_CHAINS.mainnets.map(chainId => {
            return <ChainItem key={chainId} chainId={chainId} />;
          })}
        </div>
      </div>
      <div className={classes.supportedNetworksList}>
        <Typography className={classes.tabContentTitle} variant="subtitle3">
          {t(keys.testnets)}
        </Typography>
        <div className={classes.supportedChainsList}>
          {ADVANCED_API_CHAINS.testnets.map(chainId => {
            return <ChainItem key={chainId} chainId={chainId} />;
          })}
        </div>
      </div>
    </div>
  );
};
