import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';

import { useDeleteUserGroup } from './useDeleteUserGroup';
import { GroupAddressField } from '../UserManageFormFields/GroupAddressField';

export const DeleteUserGroup = () => {
  const { handleSubmit, isLoading, isDeleteMembersChecked, onSwitch } =
    useDeleteUserGroup();

  return (
    <>
      <Typography variant="h6" mb={4}>
        Delete Group
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <GroupAddressField />
        <br />
        <br />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch value={isDeleteMembersChecked} onChange={onSwitch} />
            }
            label="Delete Members"
          />
        </FormGroup>
        <br />
        <Button
          disabled={isLoading}
          type="submit"
          color="error"
          sx={{
            mt: 4,
            width: 266,
          }}
          size="large"
        >
          Delete group
        </Button>
      </form>
    </>
  );
};
