import { Link, LinkProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { LoadableButton } from 'uiKit/LoadableButton';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { useAccountDetailsButton } from './hooks/useAccountDetailsButton';
import { Balance } from '../Balance';
import { AccountMarker } from '../AccountMarker';
import { useStyles } from './AccountDetailsButtonStyles';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
  isMobileSideBar?: boolean;
}

export const AccountDetailsButton = ({
  isMobile = false,
  isMobileSideBar = false,
}: AccountDetailsButtonProps) => {
  const { balance, hasStatusTransition, isLoading, status } =
    useAccountDetailsButton();

  const statusBlockName = BlockWithPermission.AccountStatus;
  const hasStatusAccess = useGuardUserGroup({ blockName: statusBlockName });
  const showLoading = hasStatusAccess && isLoading;
  const isStatusTransitionActive = hasStatusAccess && hasStatusTransition;

  const { classes } = useStyles({
    hasStatusTransition: isStatusTransitionActive,
    hasStatusAccess,
    isMobile,
    isMobileSideBar,
  });

  const hasEndIcon = !showLoading && isStatusTransitionActive;

  return (
    <LoadableButton<'a', LinkProps>
      className={classes.accountDetailsButtonRoot}
      component={Link}
      loading={showLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
      endIcon={hasEndIcon && <CircularProgress size={20} />}
    >
      <div className={classes.content}>
        <GuardUserGroup blockName={statusBlockName}>
          <AccountMarker status={status} />
        </GuardUserGroup>
        <span className={classes.label}>
          <Balance balance={balance} className={classes.balance} />
          {!isMobileSideBar && (
            <span className={classes.currency}>
              &nbsp;{t('account.currencies.credit')}
            </span>
          )}
        </span>
      </div>
    </LoadableButton>
  );
};
