import React from 'react';

import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import mockedLogo from '../ChainsItem/assets/logo-mock.svg';

const CHAINS_DATA = {
  chainLogo: mockedLogo,
  name: 'polygon',
  requestInfo: 'requestInfo',
  period: '24h',
  chainLink: 'chainLink',
  chainDetailsLink: '/chains/id',
};

const CHAINS_MOCK = new Array(10).fill(CHAINS_DATA);

export const ChainsList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
          <div className={classes.wrappper} key={index}>
            <ChainsItem
              logoSrc={chainLogo}
              name={name}
              description={requestInfo}
              period={period}
              chainLink={chainLink}
              chainDetailsLink={chainDetailsLink}
            />
          </div>
        );
      })}
    </div>
  );
};
