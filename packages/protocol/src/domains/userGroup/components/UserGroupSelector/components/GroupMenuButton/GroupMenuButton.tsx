import { ArrowDown } from '@ankr.com/ui';
import { Button } from '@mui/material';

import { SelectedGroupAvatar } from '../SelectedGroupAvatar';
import { useGroupMenuButtonStyles } from './GroupMenuButtonStyles';
import { useMenu } from 'modules/common/hooks/useMenu';

export interface GroupMenuButtonProps {
  isMenuOpen: boolean;
  onClick: ReturnType<typeof useMenu>['handleOpen'];
}

export const GroupMenuButton = ({
  isMenuOpen,
  onClick,
}: GroupMenuButtonProps) => {
  const { classes } = useGroupMenuButtonStyles(isMenuOpen);

  return (
    <Button
      className={classes.root}
      classes={{
        endIcon: classes.endIcon,
      }}
      endIcon={<ArrowDown className={classes.arrow} />}
      onClick={onClick}
      variant="text"
    >
      <SelectedGroupAvatar />
    </Button>
  );
};
