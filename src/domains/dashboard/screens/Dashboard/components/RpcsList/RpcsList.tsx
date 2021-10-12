import React from 'react';

import { CHAINS_MOCK } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListMock';

import { RpcItem } from '../RpcItem';
import { useStyles } from './useStyles';

export const RpcsList = () => {
  const classes = useStyles();

  return (
    <div>
      {CHAINS_MOCK.map((item, index) => {
        const {
          chainLogo,
          name,
          requestInfo,
          period,
          chainLink,
          chainDetailsLink,
        } = item;

        return (
          <RpcItem
            logoSrc={chainLogo}
            name={name}
            description={requestInfo}
            period={period}
            chainLink={chainLink}
            chainDetailsLink={chainDetailsLink}
            key={index}
            className={classes.item}
            extraLabel="21 req"
            extraDescription="sec"
          />
        );
      })}
    </div>
  );
};
