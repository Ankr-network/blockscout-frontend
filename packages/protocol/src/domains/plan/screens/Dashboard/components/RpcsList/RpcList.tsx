import React from 'react';

import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t } from 'modules/i18n/utils/intl';
import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';
import { RpcsListProps } from './RpcsListProps';
import { IApiChainURL } from 'domains/chains/api/queryChains';

export const RpcList = ({ data }: RpcsListProps) => {
  const classes = useStyles();
  const chains = formatChains(data);

  return (
    <div>
      {chains.map(item => {
        const { id, icon, extenders, extensions, name, requests, urls } = item;

        const links = [
          ...urls,
          ...(extensions || []).flatMap<IApiChainURL>(
            extension => extension.urls,
          ),
          ...(extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
        ];

        return (
          <RpcItem
            logoSrc={icon}
            period=""
            name={name}
            links={links}
            key={id}
            id={id}
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
