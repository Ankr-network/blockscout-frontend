import React from 'react';

import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t } from 'modules/i18n/utils/intl';
import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';
import { RpcsListProps } from './RpcsListProps';
import defaulLogo from './assets/defaultLogo.svg';

export const RpcList = ({ data }: RpcsListProps) => {
  const classes = useStyles();

  const chains = formatChains(data);

  return (
    <div>
      {chains.map(item => {
        const { id, name, requests, rpcLinks } = item;

        return (
          <RpcItem
            logoSrc={defaulLogo}
            period=""
            name={name}
            links={rpcLinks}
            key={id}
            className={classes.item}
            description={
              requests ? t('chains.requests', { value: requests }) : ''
            }
          />
        );
      })}
    </div>
  );
};
