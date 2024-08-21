import {
  Box,
  Button,
  Modal,
  Typography,
  InputLabel,
  Input,
} from '@mui/material';
import { Plus } from '@ankr.com/ui';

import { ClientMapped } from 'modules/clients/store/clientsSlice';

import { useClientNewReferralCodeModal } from './useClientNewReferralCodeModal';
import { useClientNewReferralCodeModalStyles } from './useClientNewReferralCodeModalStyles';

interface IClientNewReferralCodeModalProps {
  currentClient: ClientMapped;
}

/* eslint-disable max-lines-per-function */
export const ClientNewReferralCodeModal = ({
  currentClient,
}: IClientNewReferralCodeModalProps) => {
  const { classes } = useClientNewReferralCodeModalStyles();

  const {
    open,
    handleSubmit,
    isLoading,
    nameValue,
    onInputNameChange,
    validFromValue,
    onInputValidFromChange,
    validUntilValue,
    onInputValidUntilChange,
    bundleIdValue,
    onInputBundleIdChange,
    voucherCurrencyValue,
    onInputVoucherCurrencyChange,
    voucherAmountValue,
    onInputVoucherAmountChange,
    voucherExpiresAtValue,
    onInputExpiresAtChange,
    handleClose,
    handleOpen,
  } = useClientNewReferralCodeModal(currentClient);

  const body = (
    <div className={classes.paper}>
      <Typography variant="h6" id="manage-client-balance-modal">
        Add new referral code
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
        <b>{currentClient.address}</b>
        <br />
        <br />
        <InputLabel children="Name" />
        <Input
          name="name"
          id="name"
          placeholder="Add Name"
          disabled={isLoading}
          value={nameValue}
          onChange={onInputNameChange}
        />
        <br />
        <br />
        Bonus (optional):
        <InputLabel children="Valid from (timestamp ms)" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="validFrom"
          id="validFrom"
          placeholder="valid from"
          disabled={isLoading}
          value={validFromValue}
          onChange={onInputValidFromChange}
        />
        <InputLabel children="Valid until (timestamp ms)" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="validUntil"
          id="validUntil"
          placeholder="valid until"
          disabled={isLoading}
          value={validUntilValue}
          onChange={onInputValidUntilChange}
        />
        <InputLabel children="Bundle id" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="bundleId"
          id="bundleId"
          placeholder="bundle id"
          disabled={isLoading}
          value={bundleIdValue}
          onChange={onInputBundleIdChange}
        />
        <InputLabel children="Voucher currency" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="voucherCurrency"
          id="voucherCurrency"
          placeholder="voucher currency"
          disabled={isLoading}
          value={voucherCurrencyValue}
          onChange={onInputVoucherCurrencyChange}
        />
        <InputLabel children="Voucher amount" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="voucherAmount"
          id="voucherAmount"
          placeholder="voucher amount"
          disabled={isLoading}
          value={voucherAmountValue}
          onChange={onInputVoucherAmountChange}
        />
        <InputLabel children="Voucher expires at (timestamp ms)" />
        <Input
          sx={{ mt: 2, mb: 6 }}
          name="voucherExpiresAt"
          id="voucherExpiresAt"
          placeholder="voucher expires at"
          disabled={isLoading}
          value={voucherExpiresAtValue}
          onChange={onInputExpiresAtChange}
        />
        <Box display="flex" justifyContent="space-between">
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
            disabled={isLoading}
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

  return (
    <>
      <Button onClick={handleOpen} color="secondary" startIcon={<Plus />}>
        Add new referral code
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
