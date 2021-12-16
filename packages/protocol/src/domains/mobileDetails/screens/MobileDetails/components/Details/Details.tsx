import React from 'react';

import { StakingInfo } from 'modules/layout/components/StakingInfo';
import { ExtraNavigation } from 'modules/layout/components/ExtraNavigation';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { useStyles } from './useStyles';
import { IS_I18N_ENABLED } from 'modules/layout/components/Header';

const ENABLE_STAKING_BANNER = true;

export const Details = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {ENABLE_STAKING_BANNER && <StakingInfo className={classes.info} />}
      <div className={classes.navigation}>
        <ExtraNavigation />
      </div>
      {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
    </div>
  );
};
