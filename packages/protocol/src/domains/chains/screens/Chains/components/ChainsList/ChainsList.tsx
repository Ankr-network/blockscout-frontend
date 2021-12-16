import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import { formatChains, PERIOD } from './ChainsListUtils';
import { ChainsListProps } from './ChainsListTypes';

export const ChainsList = ({ data }: ChainsListProps) => {
  const classes = useStyles();
  const history = useHistory();
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
              chain={item}
            />
          </div>
        );
      })}
    </div>
  );
};
