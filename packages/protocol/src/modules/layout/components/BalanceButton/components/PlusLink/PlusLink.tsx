import { Plus } from '@ankr.com/ui';
import { Button, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';

import { usePlusLinkStyles } from './usePlusLinkStyles';

export const PlusLink = () => {
  const { classes } = usePlusLinkStyles();
  const { pathname } = useLocation();

  const isBillingPage = pathname === AccountRoutesConfig.accountDetails.path;

  return (
    <Tooltip
      title={t(`header.balance-button.${isBillingPage ? 'form-below' : 'pay'}`)}
      placement="bottom"
    >
      <Button
        component={Link}
        to={AccountRoutesConfig.accountDetails.path}
        className={classes.root}
      >
        <Plus className={classes.icon} />
      </Button>
    </Tooltip>
  );
};
