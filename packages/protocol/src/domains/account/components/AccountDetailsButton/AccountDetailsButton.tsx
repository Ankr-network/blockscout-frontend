import { Link, LinkProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { LoadableButton } from 'uiKit/LoadableButton';

import { useAccountDetailsButton } from './hooks/useAccountDetailsButton';
import { Balance } from '../Balance';
import { AccountMarker } from '../AccountMarker';
import { useStyles } from './AccountDetailsButtonStyles';

export interface AccountDetailsButtonProps {
  isMobileType?: boolean;
  isSidebarType?: boolean;
}

export const AccountDetailsButton = ({
  isMobileType = false,
  isSidebarType = false,
}: AccountDetailsButtonProps) => {
  const { balance, hasStatusTransition, isLoading, status, isUninitialized } =
    useAccountDetailsButton();

  const { cx, classes } = useStyles({ hasStatusTransition });

  const hasEndIcon = !isLoading && hasStatusTransition;

  if (isUninitialized) return null;

  return (
    <LoadableButton<'a', LinkProps>
      className={cx({
        [classes.buttonRoot]: !isMobileType,
        [classes.mobileTypeButtonRoot]: isMobileType,
        [classes.sidebarTypeButtonRoot]: isSidebarType,
      })}
      component={Link}
      loading={isLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
      endIcon={hasEndIcon && <CircularProgress size={20} />}
    >
      <div
        className={cx(classes.content, {
          [classes.mobileTypeContent]: isMobileType,
        })}
      >
        <AccountMarker status={status} />
        <span
          className={cx({
            [classes.label]: !isMobileType,
            [classes.mobileTypeLabel]: isMobileType,
          })}
        >
          <Balance balance={balance} className={classes.balance} />
          {!isMobileType && (
            <span
              className={cx(classes.currency, {
                [classes.mobileTypeCurrency]: isMobileType,
              })}
            >
              &nbsp;{t('account.currencies.credit')}
            </span>
          )}
        </span>
      </div>
    </LoadableButton>
  );
};
