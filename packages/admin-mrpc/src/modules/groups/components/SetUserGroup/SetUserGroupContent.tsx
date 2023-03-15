import { FormEvent } from 'react';
import {
  Button,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { UserGroupRole } from 'multirpc-sdk';
import { FormElementItems, FormElements, roles } from './useSetUserGroup';
import { useSetUserGroupStyles } from './useSetUserGroupStyles';

interface SetUserGroupContentProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> & { target: FormElements },
  ) => void;
  role: UserGroupRole;
  handleSelectRole: (e: SelectChangeEvent<UserGroupRole>) => void;
  isLoading: boolean;
}

export const SetUserGroupContent = ({
  handleSubmit,
  role,
  handleSelectRole,
  isLoading,
}: SetUserGroupContentProps) => {
  const { classes } = useSetUserGroupStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="h6" id="add-user-to-group-modal" mb={4}>
        Add user to group
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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

        <Typography display="block" mt={4} ml={2} variant="subtitle2">
          Group ETH Address:
        </Typography>
        <Input
          required
          className={classes.input}
          name={FormElementItems.groupAddress}
          id={FormElementItems.groupAddress}
          placeholder="Group address"
        />

        <Typography display="block" mt={4} ml={2} variant="subtitle2">
          User ETH Address:
        </Typography>
        <Input
          required
          className={classes.input}
          name={FormElementItems.userAddress}
          id={FormElementItems.userAddress}
          placeholder="User Address"
        />

        <Button
          disabled={isLoading}
          type="submit"
          className={classes.button}
          sx={{ mt: 4 }}
          size="large"
        >
          Add client to group
        </Button>
      </form>
    </div>
  );
};
