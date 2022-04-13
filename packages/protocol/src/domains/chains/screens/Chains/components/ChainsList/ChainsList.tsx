import React from 'react';
import { t } from 'modules/i18n/utils/intl';
import { useChainListStyles } from './ChainsListStyles';
import { formatChains, PERIOD } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';
import { ChainsItemQuery } from '../ChainsItem/ChainsItemQuery';

export const ChainsList = ({ data }: ChainsListProps) => {
  const classes = useChainListStyles();
  const chains = formatChains(data);

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, requests, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItemQuery
              chainId={id}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              links={urls}
              description={
                requests ? t('chains.requests', { value: requests }) : ''
              }
              chain={item}
            />
          </div>
        );
      })}
    </div>
  );
};
