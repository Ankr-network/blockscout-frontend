import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import { ChainsListProps } from './ChainsListTypes';
import { ChainDialog } from '../ChainDialog';
import { IApiChain } from 'domains/chains/api/queryChains';
import { PlanRoutesConfig } from 'domains/plan/Routes';

export const ChainsList = ({ data }: ChainsListProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (chainId: string) => {
      const link = PlanRoutesConfig.addEndpoint.generatePath(chainId);

      history.push(link);
    },
    [history],
  );

  const [selectedChain, setSelectedChain] = useState<IApiChain | null>();
  const onClose = useCallback(() => setSelectedChain(null), []);

  return (
    <div className={classes.root}>
      {data.map(item => {
        const { id, name } = item;

        return (
          <div className={classes.wrapper} key={id}>
            <ChainsItem
              logoSrc={item.icon}
              name={name}
              onChainItemClick={() => setSelectedChain(item)}
              onButtonClick={() => handleClick(id)}
            />
          </div>
        );
      })}
      {selectedChain && (
        <ChainDialog
          isOpened={Boolean(selectedChain)}
          onClose={onClose}
          onButtonClick={() => handleClick(selectedChain.id)}
          id={selectedChain.id}
          icon={selectedChain.icon}
          name={selectedChain.name}
        />
      )}
    </div>
  );
};
