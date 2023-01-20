import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Input, MenuItem, Modal, Typography } from '@mui/material';

import { ReactComponent as IconWallet } from 'assets/img/wallet.svg';
import { IAmountType } from 'multirpc-sdk';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useAddUserVoucherCreditsMutation } from 'modules/clients/actions/addUserVoucherCredits';
import { useSubtractUserVoucherCreditsMutation } from 'modules/clients/actions/subtractUserVoucherCredits';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { ClientBalancesInfo } from './ClientBalancesInfo';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { useRates } from './useRates';

interface IFormElements {
  elements: {
    comment: { value: string };
  };
}

const ADD_CREDITS_ID = 'add';
const SUBTRACT_CREDITS_ID = 'subtract';

export const ClientBalancesModal = ({
  currentClient,
  isMenuElement,
}: {
  currentClient: ClientMapped;
  isMenuElement?: boolean;
}) => {
  const { classes, cx } = useStyles();
  const [addUserVoucherCredits, { isLoading: isLoadingAddCredits }] =
    useAddUserVoucherCreditsMutation();
  const [subtractUserVoucherCredits, { isLoading: isLoadingSubtractCredits }] =
    useSubtractUserVoucherCreditsMutation();
  const { refetch: refetchClients } = useFetchCountersQuery();
  const { refetch: refetchTransactions } = useFetchUserTransactionsQuery({
    address: currentClient.address!,
  });

  const { renderAmountEquivalent } = useRates();

  const isLoading = isLoadingAddCredits || isLoadingSubtractCredits;

  const [amount, setAmount] = useState<number | undefined>(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & {
      target: IFormElements;
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
      comment: { value: commentValue },
    } = e.target.elements;

    if (!currentClient.address) {
      toast.error("Can't find user address");
      return;
    }

    if (!amount) {
      toast.error('amount field is required');
      return;
    }

    const requestParams = {
      address: currentClient.address,
      amountType: 'credit' as IAmountType,
      amount: amount.toString(),
      reasonId: `${Date.now()} ${commentValue || ''}`,
    };

    const handleResponse = (res: any) => {
      if ('data' in res && res.data.success) {
        refetchClients();
        refetchTransactions();
        handleClose();
      }
    };

    if (submitterId === ADD_CREDITS_ID) {
      addUserVoucherCredits(requestParams).then(handleResponse);
    }

    if (submitterId === SUBTRACT_CREDITS_ID) {
      subtractUserVoucherCredits(requestParams).then(handleResponse);
    }
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h5" id="manage-client-balance-modal">
        Manage Credits
      </Typography>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ClientBalancesInfo currentClient={currentClient} size={6} />
        <br />

        <Input
          name="amount"
          id="amount"
          placeholder="amount of credits"
          type="number"
          disabled={isLoading}
          endAdornment="Voucher&nbsp;Credits"
          onChange={e => setAmount(+e?.target?.value || undefined)}
          value={amount}
        />
        <Typography sx={{ ml: 3, mb: 2 }} component="p" variant="caption">
          {renderAmountEquivalent(amount)}
        </Typography>
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="comment"
          id="comment"
          placeholder="comment"
          disabled={isLoading}
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            id={ADD_CREDITS_ID}
            disabled={isLoading}
            type="submit"
            className={classes.button}
            color="primary"
            size="large"
          >
            Add Credits
          </Button>

          <Button
            id={SUBTRACT_CREDITS_ID}
            disabled={isLoading}
            type="submit"
            className={cx(classes.button, classes.buttonSubtract)}
            color="secondary"
            size="large"
          >
            Remove Credits
          </Button>
        </Box>
      </form>
    </div>
  );

  const handleClickMenuButton = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    handleOpen();
  };

  return (
    <>
      {isMenuElement ? (
        <MenuItem onClick={handleClickMenuButton}>
          <IconWallet style={{ marginRight: 8 }} />
          Manage credits
        </MenuItem>
      ) : (
        <Button
          onClick={handleOpen}
          color="secondary"
          className={classes.balancesBtn}
          startIcon={<IconWallet />}
        >
          Manage Credits
        </Button>
      )}

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
