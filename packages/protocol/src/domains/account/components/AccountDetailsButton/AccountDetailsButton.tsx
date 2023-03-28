import { Link, LinkProps } from 'react-router-dom';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from '@ankr.com/common';
import { LoadableButton } from 'uiKit/LoadableButton';
import { AccountMarker } from '../AccountMarker';
import { Balance } from '../Balance';
import { useStyles } from './AccountDetailsButtonStyles';
import { useAccountData } from './hooks/useAccountData';
import { CircularProgress } from '@mui/material';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
}

export const AccountDetailsButton = ({
  isMobile = false,
}: AccountDetailsButtonProps) => {
  const { balance, hasStatusTransition, isLoading, status } = useAccountData();

  const { classes } = useStyles({ hasStatusTransition, isMobile });

  return (
    <LoadableButton<'a', LinkProps>
      className={classes.accountDetailsButtonRoot}
      component={Link}
      loading={isLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
      endIcon={
        !isLoading && hasStatusTransition && <CircularProgress size={20} />
      }
    >
      <div className={classes.content}>
        <AccountMarker status={status} />
        <span className={classes.label}>
          <Balance balance={balance} className={classes.balance} />
          <span className={classes.currency}>
            &nbsp;{t('account.currencies.credit')}
          </span>
        </span>
      </div>
    </LoadableButton>
  );
};
