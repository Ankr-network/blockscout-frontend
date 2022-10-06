import { Fragment } from 'react';
import {
  CardContent,
  Typography,
  Box,
  Card,
  Skeleton,
  Grid,
  Paper,
} from '@mui/material';

import { UserTypeTag } from '../UserTypeTag';
import { ClientMapped } from '../../store/clientsSlice';
import { ClientBalancesModal } from './ClientBalancesModal';
import { useClientDetailsStyles as useStyles } from './ClientDetailsStyles';
import { IUserStatsResponse, Web3Address } from 'multirpc-sdk';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { Spinner } from 'ui';
import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';

interface IClientInfoProps {
  address: Web3Address;
  currentClient?: ClientMapped[];
  statsData?: IUserStatsResponse;
  transactionsCost?: number;
  isLoadingClients?: boolean;
  isLoadingTransactions?: boolean;
  isLoadingStats?: boolean;
}

export const ClientInfo = ({
  address,
  currentClient = [],
  statsData,
  transactionsCost,
  isLoadingClients,
  isLoadingTransactions,
  isLoadingStats,
}: IClientInfoProps) => {
  const { classes } = useStyles();
  const [client] = currentClient;

  const skeleton = (
    <Skeleton
      animation="wave"
      style={{ display: 'inline-block' }}
      variant="rectangular"
      width={100}
      height={16}
    />
  );

  const renderMainInfo = (user: ClientMapped) => (
    <Fragment key={user.user}>
      <Box display="flex" alignItems="center">
        <Typography className={classes.typeText} variant="body2" component="p">
          <b>Type:</b>
        </Typography>
        {isLoadingClients ? (
          'Loading...'
        ) : (
          <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
        )}
      </Box>
      <br />
      <Typography variant="body2" component="p">
        <b>Created:</b>{' '}
        {isLoadingClients ? 'Loading...' : user.createdDate.toLocaleString()}
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        <b>Token:</b> {isLoadingClients ? 'Loading...' : user.user}
      </Typography>
      <hr />
    </Fragment>
  );

  const statsText = statsData?.totalRequests
    ? `${statsData.totalRequests} in last 30d`
    : 'Not found';
  const revenueText =
    transactionsCost !== undefined && +transactionsCost > 0
      ? renderUSD(transactionsCost.toString())
      : 'Not found';
  const clientEmailText = client && client.email ? client.email : 'Not found';

  return (
    <>
      <Typography className={classes.clientAddress} variant="h6">
        {address} <ButtonCopy valueToCopy={address} />
      </Typography>
      {client && client.address && (
        <ClientBalancesModal currentClient={client} />
      )}
      <Paper sx={{ p: 5 }}>
        <Typography variant="body2" component="p">
          <b>Email:</b> {isLoadingClients ? skeleton : clientEmailText}
        </Typography>
      </Paper>
      <Card className={classes.root}>
        <CardContent>
          {isLoadingClients ? (
            <Spinner size={40} centered={false} />
          ) : (
            currentClient.map(renderMainInfo)
          )}
        </CardContent>
      </Card>

      <Grid
        className={classes.gridContainer}
        container
        spacing={5}
        wrap="nowrap"
      >
        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Current Funds Balance
          </Typography>
          <Typography variant="subtitle1" component="p">
            <b>
              {isLoadingClients ? skeleton : renderUSD(client?.amountUsd) || 0}
            </b>
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Current API Credit Balance
          </Typography>
          <Typography variant="subtitle1" component="p">
            <b>
              {isLoadingClients ? skeleton : renderBalance(client?.amount) || 0}
            </b>
          </Typography>
          <Typography variant="caption" component="p">
            {isLoadingClients
              ? skeleton
              : `${renderBalance(client?.voucherAmount) || 0} Voucher Credits`}
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Total revenue
          </Typography>
          <Typography variant="subtitle1" component="p">
            <b>{isLoadingTransactions ? skeleton : revenueText}</b>
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Total requests
          </Typography>

          <Typography variant="subtitle1" component="p">
            <b>{isLoadingStats ? skeleton : statsText}</b>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
