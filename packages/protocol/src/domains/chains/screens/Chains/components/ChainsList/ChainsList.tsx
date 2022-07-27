import React from 'react';

import { ChainsItemQuery } from '../ChainsItem/ChainsItemQuery';
import { ChainsListProps } from './ChainsListTypes';
import { PERIOD } from './ChainsListUtils';
import { useChainListStyles } from './ChainsListStyles';
import { useChains } from './hooks/useChains';

export const ChainsList = ({
  chains,
  sortType,
  statsTimeframe,
}: ChainsListProps) => {
  const classes = useChainListStyles();

  const processedChains = useChains({ chains, sortType });

  return (
    <div className={classes.root}>
      {processedChains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItemQuery
              chain={item}
              chainId={id}
              links={urls}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              statsTimeframe={statsTimeframe}
            />
          </div>
        );
      })}
    </div>
  );
};
