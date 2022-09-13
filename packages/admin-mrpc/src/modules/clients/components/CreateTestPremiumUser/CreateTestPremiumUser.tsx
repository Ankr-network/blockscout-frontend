import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { useCreateTestPremiumUserMutation } from '../../actions/createTestPremiumUser';
import { useCreateTestPremiumUserStyles } from './useCreateTestPremiumUserStyles';

const DAYS_TO_SECONDS_MULTIPLY_VALUE = 86400;

interface FormElements {
  elements: { userWallet: { value: string }; testingPeriod: { value: number } };
}

export const CreateTestPremiumUser = () => {
  const [createTestPremiumUser, { isLoading }] =
    useCreateTestPremiumUserMutation();
  const classes = useCreateTestPremiumUserStyles();

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
        address: userWalletValue,
        duration: testingPeriodValue * DAYS_TO_SECONDS_MULTIPLY_VALUE,
      }).then(_res => {
        setOpen(false);
        if (_res) {
          // eslint-disable-next-line no-console
          console.log(_res);
          // TODO: redirect to client page using _res
        }
      });
    } else {
      toast.error('User wallet and Testing Period are required');
    }
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h3" id="add-new-client-modal">
        Add New Client
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          className={classes.input}
          name="userWallet"
          id="userWallet"
          label="User wallet"
          variant="outlined"
        />
        <TextField
          disabled
          className={classes.input}
          name="email"
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          required
          type="number"
          className={classes.input}
          name="testingPeriod"
          id="testingPeriod"
          label="Testing Period (days)"
          variant="outlined"
        />
        <TextField
          disabled
          className={classes.input}
          name="comment"
          id="comment"
          label="Comment"
          variant="outlined"
        />

        <Button
          disabled={isLoading}
          type="submit"
          className={classes.button}
          color="primary"
        >
          Add client
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button onClick={handleOpen} className={classes.button} color="primary">
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
