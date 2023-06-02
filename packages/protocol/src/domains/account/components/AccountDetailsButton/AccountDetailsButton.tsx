import { Link, LinkProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { t } from '@ankr.com/common';

import { LoadableButton } from 'uiKit/LoadableButton';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { AccountMarker } from '../AccountMarker';
import { Balance } from '../Balance';
import { useAccountData } from './hooks/useAccountData';
import { useStyles } from './AccountDetailsButtonStyles';

export interface AccountDetailsButtonProps {
  isMobile?: boolean;
  isMobileSideBar?: boolean;
}

export const AccountDetailsButton = ({
  isMobile = false,
  isMobileSideBar = false,
}: AccountDetailsButtonProps) => {
  const { balance, hasStatusTransition, isLoading, status } = useAccountData();

  const statusBlockName = BlockWithPermission.Status;
  const hasStatusAccess = useGuardUserGroup({ blockName: statusBlockName });
  const showLoading = hasStatusAccess && isLoading;
  const isStatusTransitionActive = hasStatusAccess && hasStatusTransition;

  const { classes } = useStyles({
    hasStatusTransition: isStatusTransitionActive,
    hasStatusAccess,
    isMobile,
    isMobileSideBar,
  });

  return (
    <LoadableButton<'a', LinkProps>
      className={classes.accountDetailsButtonRoot}
      component={Link}
      loading={showLoading}
      to={AccountRoutesConfig.accountDetails.path}
      variant="text"
      endIcon={
        !showLoading &&
        isStatusTransitionActive && <CircularProgress size={20} />
      }
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
