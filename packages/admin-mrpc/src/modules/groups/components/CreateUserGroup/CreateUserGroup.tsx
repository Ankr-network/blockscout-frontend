import { Button, Typography } from '@mui/material';

import { UserAddressField } from '../UserManageFormFields/UserAddressField';
import { GroupNameField } from '../UserManageFormFields/GroupNameField';
import { useCreateUserGroup } from './useCreateUserGroup';

export const CreateUserGroup = () => {
  const { handleSubmit, isLoading } = useCreateUserGroup();

  return (
    <>
      <Typography variant="h6" mb={4}>
        Create Group
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <UserAddressField />
        <GroupNameField />

        <Button
          disabled={isLoading}
          type="submit"
          sx={{
            mt: 4,
            width: 266,
          }}
          size="large"
        >
          Create group
        </Button>
      </form>
    </>
  );
};
