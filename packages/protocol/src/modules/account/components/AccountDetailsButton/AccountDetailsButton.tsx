import React from 'react';

import { AccountMarker } from '../AccountMarker';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { LoadableButton } from 'uiKit/LoadableButton';
import { useAccountData } from './hooks/useAccountData';
import { useStyles } from './AccountDetailsButtonStyles';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
}

export const AccountDetailsButton = ({
  isMobile,
}: AccountDetailsButtonProps) => {
  const { balance, isLoading, isVisible, status } = useAccountData();

  const classes = useStyles({ isMobile });

  return isVisible ? (
    <LoadableButton
      className={classes.accountDetailsButtonRoot}
      href={AccountRoutesConfig.accountDetails.path}
      loading={isLoading}
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
