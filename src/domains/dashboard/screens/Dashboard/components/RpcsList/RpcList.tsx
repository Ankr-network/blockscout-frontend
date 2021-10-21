import React from 'react';

import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t } from 'modules/i18n/utils/intl';
import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';
import { RpcsListProps } from './RpcsListProps';
import { useAuth } from '../../../../../../modules/auth/hooks/useAuth';

export const RpcList = ({ data }: RpcsListProps) => {
  const classes = useStyles();
  const { credentials } = useAuth();
  const chains = formatChains(data, Boolean(credentials));

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
            description={
              requests ? t('chains.requests', { value: requests }) : ''
            }
          />
        );
      })}
    </div>
  );
};
