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

interface IClientInfoProps {
  currentClient: ClientMapped[];
}

export const ClientInfo = ({ currentClient }: IClientInfoProps) => {
  const classes = useStyles();

  if (!currentClient[0]) {
    return null;
  }

  const renderMainInfo = (client: ClientMapped) => (
    <Fragment key={client.user}>
      <Box
        display="flex"
        alignItems="center"
        className={classes.clientInfoWrapper}
      >
        <Typography className={classes.typeText} variant="body2" component="p">
          Type:
        </Typography>
        <UserTypeTag clientType={client.clientType} clientTtl={client.ttl} />
      </Box>
      <br />
      <Typography variant="body2" component="p">
        Created: {client.createdDate.toLocaleString()}
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        Token: {client.user}
      </Typography>
      {client.email && (
        <>
          <br />
          <Typography variant="body2" component="p">
            Email: {client.email}
          </Typography>
        </>
      )}
      <hr />
    </Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="p">
          Client {currentClient[0]?.address}
        </Typography>
        <br />
        {currentClient.map(renderMainInfo)}

        {(currentClient[0]?.amountAnkr || currentClient[0]?.amountUsd) && (
          <>
            <Typography
              variant="h3"
              component="p"
              className={classes.balanceTitle}
            >
              Balance
            </Typography>
            <ClientBalancesInfo currentClient={currentClient[0]} />
          </>
        )}
        {currentClient[0]?.address && (
          <ClientBalancesModal currentClient={currentClient[0]} />
        )}
      </CardContent>
    </Card>
  );
};
