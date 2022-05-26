import React, { useMemo } from 'react';

import { useChainListStyles } from './ChainsListStyles';
import { formatChains, PERIOD, sortChains } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';
import { ChainsItemQuery } from '../ChainsItem/ChainsItemQuery';

export const ChainsList = ({ data, sortType }: ChainsListProps) => {
  const classes = useChainListStyles();

  const chains = useMemo(() => {
    const formattedChains = formatChains(data);

    return sortChains(formattedChains, sortType);
  }, [data, sortType]);

  return (
    <div className={classes.root}>
      {chains.map(item => {
        const { id, name, urls } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItemQuery
              chainId={id}
              logoSrc={item.icon}
              name={name}
              period={PERIOD}
              links={urls}
              chain={item}
            />
          </div>
        );
      })}
    </div>
  );
};
