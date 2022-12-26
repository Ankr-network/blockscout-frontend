import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { PATH_ACCOUNT } from 'domains/account/Routes';
import { ReactComponent as ArrowRightIcon } from './assets/arrow-right.svg';
import { useCostButtonStyles } from './CostButtonStyles';

export const CostButton = () => {
  const classes = useCostButtonStyles();

  return (
    <Button
      className={classes.costButton}
      component={NavLink}
      to={PATH_ACCOUNT}
      variant="outlined"
    >
      <ArrowRightIcon />
    </Button>
  );
};
