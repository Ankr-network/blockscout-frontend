import {
  CardContent,
  Typography,
  Box,
  Card,
  Skeleton,
  Grid,
  Paper,
} from '@mui/material';

import { Spinner } from 'ui';
import { IUserStatsResponse, Web3Address } from 'multirpc-sdk';

import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { ClientMapped } from '../../store/clientsSlice';
import { UserTypeTag } from '../UserTypeTag';
import { ClientBalancesModal } from './ClientBalancesModal';
import { useClientDetailsStyles as useStyles } from './ClientDetailsStyles';

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
    <Card key={user.user} className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
        </Box>
        <br />
        <Typography variant="body2" component="p" style={{ marginRight: 16 }}>
          <b>Created:</b>{' '}
       user?.createdDate?.toLocaleString()
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          <b>Token:</b>{' '}
          {isLoadingClients ? (
            'Loading...'
          ) : (
            <>
              {user.user}
              <ButtonCopy valueToCopy={user.user} />
            </>
          )}
        </Typography>
      </CardContent>
    </Card>
  );

  const statsText = statsData?.totalRequests
    ? `${statsData.totalRequests} in last 30d`
    : 'Not found';
  const revenueText =
    transactionsCost !== undefined && +transactionsCost > 0
      ? renderUSD(transactionsCost.toString())
      : 'Not found';
  const clientEmailText = client && client.email ? client.email : 'Not found';
  const voucherCreditsText = client?.voucherAmount ? (
    <>{renderBalance(client?.voucherAmount)} Voucher Credits</>
  ) : null;

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
      {isLoadingClients ? (
        <>
          <br />
          <Spinner size={40} centered={false} />
        </>
      ) : (
        currentClient.map(renderMainInfo)
      )}

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
            <b>{isLoadingClients ? skeleton : renderUSD(client?.amountUsd)}</b>
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Current API Credit Balance
          </Typography>
          <Typography variant="subtitle1" component="p">
            <b>{isLoadingClients ? skeleton : renderBalance(client?.amount)}</b>
          </Typography>
          <Typography variant="caption" component="p">
            {isLoadingClients ? skeleton : voucherCreditsText}
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
