import React from 'react';
import { useChainListStyles } from './ChainsListStyles';

export const ChainListSpinner = () => {
  const classes = useChainListStyles();

  return (
    <div className={classes.root}>
      {new Array(10).fill('1').map((_, index) => (
        <div className={classes.wrapper} key={index}>
          <div className={classes.skeleton} />
        </div>
      ))}
    </div>
  );
};
