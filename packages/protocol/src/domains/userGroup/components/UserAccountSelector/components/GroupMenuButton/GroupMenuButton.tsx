import { ArrowUpDown } from '@ankr.com/ui';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useMenu } from 'modules/common/hooks/useMenu';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { SelectedGroupAvatar } from '../SelectedGroupAvatar';
import { useGroupMenuButtonStyles } from './useGroupMenuButtonStyles';

export interface GroupMenuButtonProps {
  isMenuOpen: boolean;
  onClick: ReturnType<typeof useMenu>['handleOpen'];
}

export const GroupMenuButton = ({
  isMenuOpen,
  onClick,
}: GroupMenuButtonProps) => {
  const { classes } = useGroupMenuButtonStyles(isMenuOpen);

  const { group, isPersonal: isPersonalAccount } = useSelectedUserGroup();

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.endIcon,
      }}
      endIcon={<ArrowUpDown />}
      onClick={onClick}
      variant="text"
    >
      <SelectedGroupAvatar />
      <Typography className={classes.groupName} variant="button3">
        {isPersonalAccount ? t('teams.personal-account') : group?.name}
      </Typography>
    </Button>
  );
};
