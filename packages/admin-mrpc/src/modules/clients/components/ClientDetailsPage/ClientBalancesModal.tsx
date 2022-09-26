import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';

import { IAmountType } from 'multirpc-sdk';
import { useAddUserVoucherCreditsMutation } from '../../actions/addUserVoucherCredits';
import { useSubtractUserVoucherCreditsMutation } from '../../actions/subtractUserVoucherCredits';
import { ClientMapped } from '../../store/clientsSlice';
import { ClientBalancesInfo } from './ClientBalancesInfo';
import { useClientDetailsStyles as useStyles } from './ClientDetailsStyles';

interface FormElements {
  elements: {
    unit: { value: IAmountType };
    amount: { value: number };
    comment: { value: string };
  };
}

const ADD_CREDITS_ID = 'add';
const SUBTRACT_CREDITS_ID = 'subtract';

export const ClientBalancesModal = ({
  currentClient,
}: {
  currentClient: ClientMapped;
}) => {
  const classes = useStyles();
  const [addUserVoucherCredits, { isLoading: isLoadingAddCredits }] =
    useAddUserVoucherCreditsMutation();
  const [subtractUserVoucherCredits, { isLoading: isLoadingSubtractCredits }] =
    useSubtractUserVoucherCreditsMutation();

  const isLoading = isLoadingAddCredits || isLoadingSubtractCredits;

  const [unit, setUnit] = useState('');
  const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & {
      target: FormElements;
      nativeEvent: SubmitEvent;
    },
  ) => {
    e.preventDefault();

    // getting id of submit button for add or subtract credits
    const submitterId = e.nativeEvent.submitter?.id as
      | typeof ADD_CREDITS_ID
      | typeof SUBTRACT_CREDITS_ID
      | undefined;

    const {
      unit: { value: unitValue },
      amount: { value: amountValue },
      comment: { value: commentValue },
    } = e.target.elements;

    if (!currentClient.address) {
      toast.error("Can't find user address");
      return;
    }

    if (!unitValue || !amountValue) {
      toast.error('unit and amount fields are required');
      return;
    }

    const requestParams = {
      address: currentClient.address,
      amountType: unitValue,
      amount: amountValue.toString(),
      reasonId: `${Date.now()} ${commentValue || ''}`,
    };

    if (submitterId === ADD_CREDITS_ID) {
      addUserVoucherCredits(requestParams).then(res => {
        if ('data' in res && res.data.success) {
          handleClose();
        }
      });
    }

    if (submitterId === SUBTRACT_CREDITS_ID) {
      subtractUserVoucherCredits(requestParams).then(res => {
        if ('data' in res && res.data.success) {
          handleClose();
        }
      });
    }
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h3" id="manage-client-balance-modal">
        Manage client balance
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ClientBalancesInfo currentClient={currentClient} size={6} />

        <TextField
          select
          label="Unit"
          id="unit"
          name="unit"
          variant="outlined"
          required
          disabled={isLoading}
          value={unit}
          onChange={handleChangeUnit}
        >
          <MenuItem value="ankr">Ankr</MenuItem>
          <MenuItem value="usd">USD</MenuItem>
          <MenuItem value="credit">Voucher credit</MenuItem>
        </TextField>

        <TextField
          required
          name="amount"
          id="amount"
          label="amount"
          variant="outlined"
          type="number"
          disabled={isLoading}
        />
        <TextField
          name="comment"
          id="comment"
          label="comment"
          variant="outlined"
          disabled={isLoading}
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            id={ADD_CREDITS_ID}
            disabled={isLoading}
            type="submit"
            className={classes.button}
            color="primary"
          >
            Add Voucher
          </Button>

          <Button
            id={SUBTRACT_CREDITS_ID}
            disabled={isLoading}
            type="submit"
            className={classes.button}
            color="secondary"
          >
            Subtract Voucher
          </Button>
        </Box>
      </form>
    </div>
  );

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        className={classes.balancesBtn}
      >
        Manage user balance
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-balance-modal"
      >
        {body}
      </Modal>
    </>
  );
};
