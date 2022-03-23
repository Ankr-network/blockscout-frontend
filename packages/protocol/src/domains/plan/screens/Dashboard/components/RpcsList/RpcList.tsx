import React from 'react';

import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t } from 'modules/i18n/utils/intl';
import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';
import { RpcsListProps } from './RpcsListProps';
import { useProvider } from 'modules/auth/hooks/useProvider';

export const RpcList = ({ data }: RpcsListProps) => {
  const classes = useStyles();
  const chains = formatChains(data);
  const { providerData } = useProvider();

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
            id={id}
            className={classes.item}
            hasOnClick={Boolean(providerData)}
            description={
              requests ? t('chains.requests', { value: requests }) : ''
            }
          />
        );
      })}
    </div>
  );
};
