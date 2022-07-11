import React from 'react';

import { ExtraNavigation } from 'modules/layout/components/ExtraNavigation';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { useStyles } from './useStyles';
import { IS_I18N_ENABLED } from 'modules/layout/components/Header';

export const Details = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navigation}>
        <ExtraNavigation />
      </div>
      {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
    </div>
  );
};
