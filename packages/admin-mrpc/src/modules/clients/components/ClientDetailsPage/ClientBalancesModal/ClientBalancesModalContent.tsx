import { Box, Button, Input, Typography } from '@mui/material';
import { ClientBalancesInfo } from './ClientBalancesInfo';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useRates } from './useRates';
import {
  ADD_CREDITS_ID,
  SUBTRACT_CREDITS_ID,
  useClientBalancesModalContent,
} from './useClientBalancesModalContent';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';

interface IClientBalancesModalContentProps {
  currentClient: ClientMapped;
  onClose: () => void;
}

export const ClientBalancesModalContent = ({
  currentClient,
  onClose,
}: IClientBalancesModalContentProps) => {
  const { classes, cx } = useStyles();
  const { renderAmountEquivalent } = useRates();
  const { handleSubmit, isLoading, amount, setAmount } =
    useClientBalancesModalContent(currentClient, onClose);

  return (
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
};
