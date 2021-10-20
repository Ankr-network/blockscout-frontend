import React from 'react';

import { StakingInfo } from 'modules/layout/components/StakingInfo';
import { ExtraNavigation } from 'modules/layout/components/ExtraNavigation';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { ProBlock } from './ProBlock';
import { useStyles } from './useStyles';

export const Details = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StakingInfo />
      <ProBlock />
      <div className={classes.navigation}>
        <ExtraNavigation />
      </div>
      <LocaleSwitcher className={classes.switcher} />
    </div>
  );
};
