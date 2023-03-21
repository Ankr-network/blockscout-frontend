import { Input, Typography } from '@mui/material';

import { FormCreateUserGroupElementItems } from '../CreateUserGroup/useCreateUserGroup';

export const GroupNameField = () => {
  return (
    <>
      <Typography display="block" mt={4} ml={2} variant="subtitle2">
        Group name:
      </Typography>
      <Input
        required
        fullWidth
        name={FormCreateUserGroupElementItems.groupName}
        id={FormCreateUserGroupElementItems.groupName}
        placeholder="Group Name"
      />
    </>
  );
};
