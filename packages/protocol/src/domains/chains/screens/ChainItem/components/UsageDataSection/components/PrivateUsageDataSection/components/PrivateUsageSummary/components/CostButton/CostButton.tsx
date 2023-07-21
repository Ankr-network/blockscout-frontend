import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { t } from '@ankr.com/common';

import { PATH_ACCOUNT } from 'domains/account/Routes';

import { useCostButtonStyles } from './CostButtonStyles';

export const CostButton = () => {
  const { classes } = useCostButtonStyles();

  return (
    <Button
      className={classes.costButton}
      component={NavLink}
      to={PATH_ACCOUNT}
      variant="text"
      size="large"
    >
      {t('chain-item.usage-data.usage-summary.billing-button')}
    </Button>
  );
};
