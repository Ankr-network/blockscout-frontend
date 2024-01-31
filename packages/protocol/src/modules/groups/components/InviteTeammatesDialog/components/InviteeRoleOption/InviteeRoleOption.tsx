import { Check } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useInviteeRoleSelectorStyles } from './useInviteeRoleOptionStyles';

export interface InviteeRoleOptionProps {
  description: string;
  isSelected: boolean;
  label: string;
}

export const InviteeRoleOption = ({
  description,
  isSelected,
  label,
}: InviteeRoleOptionProps) => {
  const { classes } = useInviteeRoleSelectorStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title} variant="body2">
          {label}
        </Typography>
        <Typography className={classes.description} variant="body4">
          {description}
        </Typography>
      </div>
      {isSelected && <Check className={classes.selectedIcon} />}
    </div>
  );
};
