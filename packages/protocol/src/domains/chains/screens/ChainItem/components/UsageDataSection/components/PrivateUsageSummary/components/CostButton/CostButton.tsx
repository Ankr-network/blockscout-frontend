import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { PATH_ACCOUNT } from 'domains/account/Routes';
import { useCostButtonStyles } from './CostButtonStyles';
import { t } from '@ankr.com/common';

export const CostButton = () => {
  const classes = useCostButtonStyles();

  return (
    <Button
      className={classes.costButton}
      component={NavLink}
      to={PATH_ACCOUNT}
      variant="text"
    >
      {t('chain-item.usage-data.usage-summary.billing-button')}
    </Button>
  );
};
