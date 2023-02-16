import { Box, Button, Input, MenuItem, Modal, Typography } from '@mui/material';

import { ReactComponent as IconWallet } from 'assets/img/wallet.svg';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { ClientBalancesInfo } from './ClientBalancesInfo';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import {
  ADD_CREDITS_ID,
  SUBTRACT_CREDITS_ID,
  useClientBalancesModal,
} from './useClientBalancesModal';
import { useRates } from './useRates';

export const ClientBalancesModal = ({
  currentClient,
  isMenuElement,
}: {
  currentClient: ClientMapped;
  isMenuElement?: boolean;
}) => {
  const { classes, cx } = useStyles();
  const { renderAmountEquivalent } = useRates();
  const {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    isLoading,
    amount,
    setAmount,
  } = useClientBalancesModal(currentClient);

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
          type="number"
          sx={{ mt: 4, mb: 1 }}
          name="validDuring"
          id="validDuring"
          placeholder="days"
          disabled={isLoading}
        />
        <Typography sx={{ ml: 3, mb: 4 }} component="p" variant="caption">
          Period of use (optional)
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
