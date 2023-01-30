import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { PATH_ACCOUNT } from 'domains/account/Routes';
import { ArrowRightBig } from '@ankr.com/ui';
import { useCostButtonStyles } from './CostButtonStyles';

export const CostButton = () => {
  const { classes } = useCostButtonStyles();

  return (
    <Button
      className={classes.costButton}
      component={NavLink}
      to={PATH_ACCOUNT}
      variant="outlined"
    >
      <ArrowRightBig />
    </Button>
  );
};
