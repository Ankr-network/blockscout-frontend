import { Plus } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';

import { usePlusLinkStyles } from './usePlusLinkStyles';

export const PlusLink = () => {
  const { classes } = usePlusLinkStyles();

  return (
    <Button
      component={Link}
      to={AccountRoutesConfig.accountDetails.path}
      className={classes.root}
    >
      <Plus className={classes.icon} />
    </Button>
  );
};
