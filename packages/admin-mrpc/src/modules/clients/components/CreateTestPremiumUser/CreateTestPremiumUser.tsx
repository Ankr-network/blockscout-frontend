import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Typography, TextField } from '@mui/material';
import { ClientsRoutesConfig } from '../../ClientsRoutesConfig';
import { useCreateTestPremiumUserMutation } from '../../actions/createTestPremiumUser';
import { useCreateTestPremiumUserStyles } from './useCreateTestPremiumUserStyles';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { useFetchCountersQuery } from '../../actions/fetchCounters';

const DAYS_TO_SECONDS_MULTIPLY_VALUE = 86400;

interface FormElements {
  elements: { userWallet: { value: string }; testingPeriod: { value: number } };
}

export const CreateTestPremiumUser = () => {
  const history = useHistory();
  const [createTestPremiumUser, { isLoading }] =
    useCreateTestPremiumUserMutation();
  const { refetch: refetchClients } = useFetchCountersQuery();
  const { classes } = useCreateTestPremiumUserStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & { target: FormElements },
  ) => {
    e.preventDefault();
    const {
      userWallet: { value: userWalletValue },
      testingPeriod: { value: testingPeriodValue },
    } = e.target.elements;
    if (userWalletValue && testingPeriodValue) {
      createTestPremiumUser({
        address: userWalletValue.toLowerCase(),
        duration: testingPeriodValue * DAYS_TO_SECONDS_MULTIPLY_VALUE,
      }).then(res => {
        setOpen(false);
        if (res && 'data' in res) {
          refetchClients(); // refetching clients in order to get new client token
          history.push({
            pathname: ClientsRoutesConfig.clientInfo.generatePath(
              res.data.user.address,
            ),
          });
        }
      });
    } else {
      toast.error('User wallet and Testing Period are required');
    }
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h6" id="add-new-client-modal" mb={4}>
        Add New Client
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.input}
          name="userWallet"
          id="userWallet"
          placeholder="User wallet"
        />
        <TextField
          disabled
          className={classes.input}
          name="email"
          id="email"
          placeholder="Email"
        />
        <TextField
          type="number"
          className={classes.input}
          name="testingPeriod"
          id="testingPeriod"
          placeholder="Testing Period (days)"
        />
        <TextField
          disabled
          className={classes.input}
          name="comment"
          id="comment"
          placeholder="Comment"
        />

        <Button
          disabled={isLoading}
          type="submit"
          className={classes.button}
          sx={{ mt: 4 }}
          size="large"
        >
          Add client
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button
        onClick={handleOpen}
        className={classes.button}
        startIcon={<PlusIcon />}
      >
        Add client
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-client-modal"
      >
        {body}
      </Modal>
    </>
  );
};
