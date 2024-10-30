import { Grid, Paper, Typography } from '@mui/material';

import { formatNumber, renderUSD } from 'modules/common/utils/renderBalance';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
import { RevenueDataMapped } from 'modules/clients/actions/fetchUserRevenue';
import { ClientBalancesMapped } from 'modules/clients/types';

import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { useClientBalancesTexts } from './hooks/useClientBalancesTexts';

interface IClientBalances {
  totalData?: IGetUserTotalMapped;
  clientBalances?: ClientBalancesMapped;
  isLoadingBalances?: boolean;
  skeletonSlot: JSX.Element;
  isLoadingRevenue: boolean;
  revenueData?: RevenueDataMapped;
  isLoadingTotal?: boolean;
}

export const ClientBalances = ({
  totalData,
  isLoadingBalances,
  clientBalances,
  skeletonSlot,
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
  } = useClientBalancesTexts({ totalData, clientBalances });

  return (
    <Grid className={classes.gridContainer} container spacing={5} wrap="nowrap">
      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total Balance
        </Typography>
        <Typography variant="subtitle1" component="p">
          <b>
            {isLoadingBalances
              ? skeletonSlot
              : formatNumber(clientBalances?.amount)}
          </b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingBalances ? skeletonSlot : amountUsdText}
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Сurrent USD only Balance
        </Typography>
        <Typography variant="subtitle1" component="p">
          <b>
            {isLoadingBalances
              ? skeletonSlot
              : renderUSD(clientBalances?.creditUsdAmount)}
          </b>
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total Usage ANKR Credits
        </Typography>
        <Typography variant="subtitle1" component="p">
          {isLoadingRevenue
            ? skeletonSlot
            : formatNumber(revenueData?.totalCreditsAmount)}
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingRevenue ? (
            skeletonSlot
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
            {isLoadingBalances
              ? skeletonSlot
              : formatNumber(clientBalances?.creditVoucherAmount)}
          </b>
        </Typography>
        {clientBalances?.voucherExpiresDate && (
          <Typography variant="caption" component="p">
            {isLoadingBalances ? skeletonSlot : voucherExpiresAtText}
          </Typography>
        )}
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total cost
        </Typography>

        <Typography variant="subtitle1" component="p">
          <b>{isLoadingTotal ? skeletonSlot : totalCostText}</b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingTotal ? skeletonSlot : statsFromText}
        </Typography>
      </Grid>

      <Grid item xs={3} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          Total requests
        </Typography>

        <Typography variant="subtitle1" component="p">
          <b>{isLoadingTotal ? skeletonSlot : totalRequestsText}</b>
        </Typography>
        <Typography variant="caption" component="p">
          {isLoadingTotal ? skeletonSlot : statsFromText}
        </Typography>
      </Grid>
    </Grid>
  );
};
