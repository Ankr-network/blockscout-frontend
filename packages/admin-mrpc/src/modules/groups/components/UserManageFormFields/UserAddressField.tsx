import { Input, Typography } from '@mui/material';
import { FormElementItems } from '../SetUserGroup/useSetUserGroup';

export const UserAddressField = () => {
  return (
    <>
      <Typography display="block" mt={4} ml={2} variant="subtitle2">
        User ETH Address:
      </Typography>
      <Input
        required
        fullWidth
        name={FormElementItems.userAddress}
        id={FormElementItems.userAddress}
        placeholder="User Address"
      />
    </>
  );
};
