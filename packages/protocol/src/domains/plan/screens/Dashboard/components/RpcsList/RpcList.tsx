import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t } from 'modules/i18n/utils/intl';
import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';
import { RpcsListProps } from './RpcsListProps';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { useProvider } from 'modules/auth/hooks/useProvider';

export const RpcList = ({ data }: RpcsListProps) => {
  const classes = useStyles();
  const chains = formatChains(data);
  const history = useHistory();
  const { providerData } = useProvider();

  const handleClick = useCallback(
    (chainId: string) => {
      const link = PlanRoutesConfig.endpoint.generatePath(chainId);

      history.push(link);
    },
    [history],
  );

  return (
    <div>
      {chains.map(item => {
        const { id, icon, name, requests, rpcLinks } = item;

        return (
          <RpcItem
            logoSrc={icon}
            period=""
            name={name}
            links={rpcLinks}
            key={id}
            className={classes.item}
            onClick={providerData ? () => handleClick(id) : undefined}
            description={
              requests ? t('chains.requests', { value: requests }) : ''
            }
          />
        );
      })}
    </div>
  );
};
