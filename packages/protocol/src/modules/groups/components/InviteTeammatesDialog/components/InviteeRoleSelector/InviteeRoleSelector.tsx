import { MenuItem } from '@mui/material';
import { Select } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { InviteeRoleOption } from '../InviteeRoleOption';
import { InviteeRoleSelectorProps } from './types';
import { LearnMoreLink } from '../LearnMoreLink';
import { useInviteeRoleSelectorState } from './hooks/useInviteeRoleSelectorState';
import { useInviteeRoleSelectorStyles } from './useInviteeRoleSelectorStyles';

export const InviteeRoleSelector = ({
  className,
  onChange,
  value: inviteeRole,
}: InviteeRoleSelectorProps) => {
  const { options, renderValue } = useInviteeRoleSelectorState();

  const { classes } = useInviteeRoleSelectorStyles();

  return (
    <Select
      MenuProps={{ classes: { list: classes.list } }}
      className={className}
      endLabel={<LearnMoreLink />}
      inputProps={{ className: classes.input }}
      label={t('teams.invite-teammates-dialog.invitee-role-selector.title')}
      onChange={onChange}
      renderValue={renderValue}
      value={inviteeRole}
      variant="filled"
    >
      {options.map(({ description, label, value }) => {
        const isSelected = value === inviteeRole;

        return (
          <MenuItem
            className={classes.menuItem}
            selected={isSelected}
            value={value}
            key={value}
          >
            <InviteeRoleOption
              isSelected={isSelected}
              label={label}
              description={description}
            />
          </MenuItem>
        );
      })}
    </Select>
  );
};
