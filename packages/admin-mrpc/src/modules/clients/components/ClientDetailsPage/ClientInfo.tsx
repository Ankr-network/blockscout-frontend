import { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { UserTypeTag } from '../UserTypeTag';
import { ClientMapped } from '../../store/clientsSlice';
import { ClientBalancesInfo } from './ClientBalancesInfo';
import { ClientBalancesModal } from './ClientBalancesModal';
import { useClientDetailsStyles as useStyles } from './ClientDetailsStyles';
import { IUserStatsResponse } from 'multirpc-sdk';
import { renderUSD } from '../../../common/utils/renderBalance';

interface IClientInfoProps {
  currentClient: ClientMapped[];
  statsData?: IUserStatsResponse;
  transactionsCost?: number;
}

export const ClientInfo = ({
  currentClient,
  statsData,
  transactionsCost,
}: IClientInfoProps) => {
  const classes = useStyles();
  const [client] = currentClient;

  if (!client) {
    return null;
  }

  const renderMainInfo = (user: ClientMapped) => (
    <Fragment key={user.user}>
      <Box display="flex" alignItems="center">
        <Typography className={classes.typeText} variant="body2" component="p">
          <b>Type:</b>
        </Typography>
        <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
      </Box>
      <br />
      <Typography variant="body2" component="p">
        <b>Created:</b> {user.createdDate.toLocaleString()}
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        <b>Token:</b> {user.user}
      </Typography>
      <hr />
    </Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        {client.email && (
          <>
            <Typography variant="body2" component="p">
              <b>Email:</b> {client.email}
            </Typography>
            <br />
          </>
        )}
        {currentClient.map(renderMainInfo)}
        <br />
        <Typography variant="body2" component="p">
          <b>Total requests:</b>{' '}
          {statsData?.totalRequests
            ? `${statsData.totalRequests} in last 30d`
            : 'Not found'}
        </Typography>

        {transactionsCost !== undefined && +transactionsCost > 0 && (
          <>
            <br />
            <Typography variant="body2" component="p">
              <b>Total revenue:</b> {renderUSD(transactionsCost.toString())}
            </Typography>
          </>
        )}

        {(client.amountAnkr ||
          client.amountUsd ||
          client.amount ||
          client.voucherAmount) && (
          <>
            <Typography
              variant="h3"
              component="p"
              className={classes.balanceTitle}
            >
              Balance
            </Typography>
            <ClientBalancesInfo currentClient={client} />
          </>
        )}
        {client.address && <ClientBalancesModal currentClient={client} />}
      </CardContent>
    </Card>
  );
};
