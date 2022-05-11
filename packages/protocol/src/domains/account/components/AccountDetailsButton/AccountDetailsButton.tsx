import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { AccountMarker } from '../AccountMarker';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { LoadableButton } from 'uiKit/LoadableButton';
import { useAccountData } from './hooks/useAccountData';
import { useStyles } from './AccountDetailsButtonStyles';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
}

export const AccountDetailsButton = ({
  isMobile = false,
}: AccountDetailsButtonProps) => {
  const { balance, isLoading, isVisible, status } = useAccountData();

  const classes = useStyles(isMobile);

  return isVisible ? (
    <LoadableButton<'a', LinkProps>
      className={classes.accountDetailsButtonRoot}
      component={Link}
      loading={isLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
    >
      <div className={classes.content}>
        <AccountMarker status={status} />
        <span className={classes.label}>
          <span className={classes.balance}>{balance.toFormat()}</span>
          <span className={classes.currency}> ANKR</span>
        </span>
      </div>
    </LoadableButton>
  ) : null;
};
