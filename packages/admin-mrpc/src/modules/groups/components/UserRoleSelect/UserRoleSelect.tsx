import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { UserGroupRole } from 'multirpc-sdk';

import { FormElementItems } from '../SetUserGroup/useSetUserGroup';
import { roles } from './useUserRole';

export interface UserSelectProps {
  role: UserGroupRole;
  handleSelectRole: (e: SelectChangeEvent<UserGroupRole>) => void;
}

export const UserRoleSelect = ({ role, handleSelectRole }: UserSelectProps) => {
  return (
    <>
      <Typography ml={2} variant="subtitle2">
        User Role:
      </Typography>
      <Select
        sx={theme => ({ backgroundColor: theme.palette.background.paper })}
        fullWidth
        required
        labelId="role-label"
        id={FormElementItems.role}
        value={role}
        label="Role"
        onChange={handleSelectRole}
        variant="outlined"
      >
        {roles.map(item => (
          <MenuItem
            key={item.value}
            sx={{ width: '100%', p: 8 }}
            value={item.value}
          >
            <Typography variant="body2">{item.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
