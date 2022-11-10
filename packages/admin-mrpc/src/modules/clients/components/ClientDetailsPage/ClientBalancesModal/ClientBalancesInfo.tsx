import { Typography, Grid, GridSize, Box } from '@mui/material';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';

interface IClientBalancesInfoProps {
  currentClient: ClientMapped;
  size?: boolean | GridSize;
}

export const ClientBalancesInfo = ({
  currentClient,
  size = 3,
}: IClientBalancesInfoProps) => {
  const { classes } = useStyles();
  return (
    <Box>
      <Grid className={classes.balancesGridWrapper} container spacing={3}>
        <Grid item xs={size}>
          <Typography variant="subtitle2" component="p">
            Total amount of credits
          </Typography>
          <Typography variant="body2">
            {renderBalance(currentClient.amount)}
          </Typography>
        </Grid>
        <Grid item xs={size}>
          <Typography variant="subtitle2" component="p">
            Amount of voucher credits
          </Typography>
          <Typography variant="body2">
            {renderBalance(currentClient.voucherAmount)}
          </Typography>
        </Grid>
        <Grid item xs={size}>
          <Typography variant="subtitle2" component="p">
            Equivalent in USD
          </Typography>
          <Typography variant="body2">
            {renderUSD(currentClient.amountUsd)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
