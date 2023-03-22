import { Grid, Paper, Typography } from '@mui/material';
import { formatNumber, renderUSD } from 'modules/common/utils/renderBalance';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
import { RevenueDataMapped } from 'modules/clients/actions/fetchUserRevenue';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { useClientBalances } from './useClientBalances';

interface IClientBalances {
  totalData?: IGetUserTotalMapped;
  client: ClientMapped;
  isLoadingClients?: boolean;
  skeleton: JSX.Element;
  isLoadingRevenue: boolean;
  revenueData?: RevenueDataMapped;
  isLoadingTotal?: boolean;
}

export const ClientBalances = ({
  totalData,
  client,
  isLoadingClients,
  skeleton,
  isLoadingRevenue,
  revenueData,
  isLoadingTotal,
}: IClientBalances) => {
  const { classes } = useStyles();

  const {
    statsFromText,
    totalRequestsText,
    totalCostText,
    amountUsdText,
    voucherExpiresAtText,
  } = useClientBalances({ totalData, client });

  return (
    <Grid className={classes.gridContainer} container spacing={5} wrap="nowrap">
      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total Balance
        </Typography>
        <Typography variant="subtitle1" component="p">
          <b>{isLoadingClients ? skeleton : formatNumber(client?.amount)}</b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingClients ? skeleton : amountUsdText}
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Сurrent USD only Balance
        </Typography>
        <Typography variant="subtitle1" component="p">
          <b>
            {isLoadingClients ? skeleton : renderUSD(client?.creditUsdAmount)}
          </b>
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total Usage ANKR Credits
        </Typography>
        <Typography variant="subtitle1" component="p">
          {isLoadingRevenue
            ? skeleton
            : formatNumber(revenueData?.totalCreditsAmount)}
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingRevenue ? (
            skeleton
          ) : (
            <>{renderUSD(revenueData?.totalUsdAmount)} Equivalent in USD</>
          )}
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Voucher credits
        </Typography>
        <Typography variant="subtitle1" component="p">
          <b>
            {isLoadingClients
              ? skeleton
              : formatNumber(client?.creditVoucherAmount)}
          </b>
        </Typography>
        {client?.voucherExpiresDate && (
          <Typography variant="caption" component="p">
            {isLoadingClients ? skeleton : voucherExpiresAtText}
          </Typography>
        )}
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total cost
        </Typography>

        <Typography variant="subtitle1" component="p">
          <b>{isLoadingTotal ? skeleton : totalCostText}</b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingTotal ? skeleton : statsFromText}
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total requests
        </Typography>

        <Typography variant="subtitle1" component="p">
          <b>{isLoadingTotal ? skeleton : totalRequestsText}</b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingTotal ? skeleton : statsFromText}
        </Typography>
      </Grid>
    </Grid>
  );
};
