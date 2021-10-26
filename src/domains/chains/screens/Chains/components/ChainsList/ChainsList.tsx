import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import { formatChains, PERIOD } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';
import { useAuth } from '../../../../../../modules/auth/hooks/useAuth';
import { getMappedNetwork } from '../../../ChainItem/components/ChainItemHeader/ChainItemHeaderUtils';

export const ChainsList = ({ data }: ChainsListProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleAddNetwork, isWalletConnected } = useAuth();
  const chains = formatChains(data);

  const handleClick = useCallback(
    (chainId: string) => {
      const link = ChainsRoutesConfig.chainDetails.generatePath(chainId);

      history.push(link);
    },
    [history],
  );

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, requests, rpcLinks } = item;
        const mappedNetwork = getMappedNetwork(item);

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItem
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              links={rpcLinks}
              onButtonClick={() => handleClick(id)}
              description={
                requests ? t('chains.requests', { value: requests }) : ''
              }
              isWalletConnectButtonActive={Boolean(
                mappedNetwork && isWalletConnected,
              )}
              onNetworkAdd={() => handleAddNetwork(mappedNetwork)}
            />
          </div>
        );
      })}
    </div>
  );
};
