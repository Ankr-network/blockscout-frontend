import { Button, Typography } from '@mui/material';

import { useSetUserGroupStyles } from '../SetUserGroup/useSetUserGroupStyles';
import { useDeleteUserFromGroup } from './useDeleteUserFromGroup';
import { UserAddressField } from '../UserManageFormFields/UserAddressField';
import { GroupAddressField } from '../UserManageFormFields/GroupAddressField';

export const DeleteUserFromGroup = () => {
  const { classes } = useSetUserGroupStyles();
  const { handleSubmit, isLoading } = useDeleteUserFromGroup();

  return (
    <>
      <Typography variant="h6" mb={4}>
        Delete user from group
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <GroupAddressField />
        <UserAddressField />

        <Button
          disabled={isLoading}
          type="submit"
          color="error"
          className={classes.button}
          sx={{ mt: 4 }}
          size="large"
        >
          Delete client from group
        </Button>
      </form>
    </>
  );
};
