import { Input, Typography } from '@mui/material';
import { FormElementItems } from '../SetUserGroup/useSetUserGroup';

export const GroupAddressField = () => {
  return (
    <>
      <Typography display="block" mt={4} ml={2} variant="subtitle2">
        Group ETH Address:
      </Typography>
      <Input
        fullWidth
        required
        name={FormElementItems.groupAddress}
        id={FormElementItems.groupAddress}
        placeholder="Group address"
      />
    </>
  );
};
