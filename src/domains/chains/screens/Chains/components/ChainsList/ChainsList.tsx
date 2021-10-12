import React from 'react';

import { ChainsItem } from '../ChainsItem';
import { useStyles } from './ChainsListStyles';
import { CHAINS_MOCK } from './ChainsListMock';

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
