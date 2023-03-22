import { FormEvent } from 'react';
import { Button, Typography } from '@mui/material';
import { UserSelectProps } from '../UserRoleSelect';
import { FormElements } from './useSetUserGroup';
import { useSetUserGroupStyles } from './useSetUserGroupStyles';
import { UserManageFormFields } from '../UserManageFormFields/UserManageFormFields';

interface SetUserGroupContentProps extends UserSelectProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> & { target: HTMLFormElement & FormElements },
  ) => void;
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
    <>
      <Typography variant="h6" mb={4}>
        Add user to group
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <UserManageFormFields role={role} handleSelectRole={handleSelectRole} />

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
    </>
  );
};
