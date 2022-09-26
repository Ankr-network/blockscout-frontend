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

interface IClientInfoProps {
  currentClient: ClientMapped[];
  statsData?: IUserStatsResponse;
}

export const ClientInfo = ({ currentClient, statsData }: IClientInfoProps) => {
  const classes = useStyles();
  const [client] = currentClient;

  if (!client) {
    return null;
  }

  const renderMainInfo = (user: ClientMapped) => (
    <Fragment key={user.user}>
      <Box
        display="flex"
        alignItems="center"
        className={classes.clientInfoWrapper}
      >
        <Typography className={classes.typeText} variant="body2" component="p">
          Type:
        </Typography>
        <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
      </Box>
      <br />
      <Typography variant="body2" component="p">
        Created: {user.createdDate.toLocaleString()}
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        Token: {user.user}
      </Typography>
      <hr />
    </Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="p">
          Client {client.address}
        </Typography>
        <br />
        {currentClient.map(renderMainInfo)}

        {(client.amountAnkr || client.amountUsd) && (
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
        <br />
        <Typography variant="body2" component="p">
          Total requests:{' '}
          {statsData?.totalRequests
            ? `${statsData.totalRequests} in last 30d`
            : 'Not found'}
        </Typography>
        {client.email && (
          <>
            <br />
            <Typography variant="body2" component="p">
              Email: {client.email}
            </Typography>
          </>
        )}
        {client.address && <ClientBalancesModal currentClient={client} />}
      </CardContent>
    </Card>
  );
};
