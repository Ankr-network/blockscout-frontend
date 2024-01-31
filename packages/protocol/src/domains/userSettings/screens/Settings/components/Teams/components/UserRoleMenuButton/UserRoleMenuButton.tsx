import { ArrowDown, Lock } from '@ankr.com/ui';
import { Button } from '@mui/material';
import { GroupUserRole } from 'multirpc-sdk';

import { useMenu } from 'modules/common/hooks/useMenu';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';

import { useUserRoleMenuButtonStyles } from './useUserRoleMenuButtonStyles';

export interface GroupMenuButtonProps {
  currentRole: GroupUserRole;
  isMenuOpen: boolean;
  onClick: ReturnType<typeof useMenu>['handleOpen'];
  isDisabled?: boolean;
}

export const UserRoleMenuButton = ({
  currentRole,
  isMenuOpen,
  onClick,
  isDisabled,
}: GroupMenuButtonProps) => {
  const { classes } = useUserRoleMenuButtonStyles(isMenuOpen);

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.endIcon,
      }}
      endIcon={
        isDisabled ? (
          <Lock className={classes.selectIcon} />
        ) : (
          <ArrowDown className={classes.selectIcon} />
        )
      }
      onClick={onClick}
      variant="outlined"
      size="small"
      disabled={isDisabled}
    >
      {getUserRoleName(currentRole)}
    </Button>
  );
};
