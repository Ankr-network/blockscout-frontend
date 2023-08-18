import { ChangeEvent, FormEvent } from 'react';
import { Box, Button, Input, InputLabel, Typography } from '@mui/material';

import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { FormElements } from './useClientEditEmail';

interface IClientEditEmailModalContentProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> & { target: FormElements },
  ) => void;
  clientEthAddress: string;
  isLoading: boolean;
  emailValue?: string;
  onInputEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

export const ClientEditEmailModalContent = ({
  handleSubmit,
  clientEthAddress,
  isLoading,
  emailValue,
  onInputEmailChange,
  handleClose,
}: IClientEditEmailModalContentProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="h6" id="manage-client-email-modal">
        Edit client email
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography sx={{ ml: 1 }} color="textSecondary" variant="caption">
          Ethereum Account
        </Typography>
        <br />
        <b>{clientEthAddress}</b>
        <br />
        <br />
        <InputLabel children="Email" />
        <Input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Add Email"
          disabled={isLoading}
          value={emailValue}
          onChange={onInputEmailChange}
        />

        <Box display="flex" justifyContent="space-between" sx={{ mt: 6 }}>
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleClose}
            className={classes.button}
            color="secondary"
            size="large"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || clientEthAddress === emailValue}
            type="submit"
            className={classes.button}
            color="primary"
            size="large"
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};
