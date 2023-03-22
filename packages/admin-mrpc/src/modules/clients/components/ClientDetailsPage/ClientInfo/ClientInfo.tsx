import {
  CardContent,
  Typography,
  Box,
  Card,
  Skeleton,
  Paper,
  Input,
} from '@mui/material';

import { Spinner } from 'ui';
import { IEthUserAddressV2, Web3Address } from 'multirpc-sdk';

import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';

import { UserTypeTag } from '../../UserTypeTag';
import { ClientBalancesModal } from '../ClientBalancesModal';
import { useClientInfo } from './useClientInfo';
import { useClientGroups } from './useClientGroups';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { ClientEditProfileModal } from '../ClientEditProfileModal';
import { ClientApiKeysModal } from '../ClientApiKeysModal';
import { ClientEditEmailModal } from '../ClientEditEmailModal';
import { ClientBalances } from './ClientBalances';
import { useClientAddresses } from './useClientAddresses';
import { ClientUserGroups } from './ClientUserGroups';
import { NOT_FOUND_TEXT } from '../const';

interface IClientInfoProps {
  address: Web3Address;
  currentClient?: ClientMapped[];
  isLoadingClients?: boolean;
  totalData?: IGetUserTotalMapped;
  isLoadingTotal?: boolean;
}

export const ClientInfo = ({
  address,
  currentClient = [],
  isLoadingClients,
  totalData,
  isLoadingTotal,
}: IClientInfoProps) => {
  const [client] = currentClient;
  const {
    onChangeComment,
    commentInputValue,
    isLoadingProfile,
    isLoadingEditProfile,
    handleBlurCommentInput,
    handleKeyDownInputComment,
    userName,
    revenueData,
    isLoadingRevenue,
  } = useClientInfo({ address });

  const { userAddressesData, isLoadingUserAddresses, isErrorUserAddresses } =
    useClientAddresses({ address });

  const { userGroups, isLoadingUserGroups } = useClientGroups({ address });

  const { classes } = useStyles();

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
    <Card key={user.user || user.address} className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
        </Box>
        <br />
        <Typography variant="body2" component="p" style={{ marginRight: 16 }}>
          <b>Created:</b> {user?.createdDate?.toLocaleString() || 'unknown'}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          <b>Token:</b>{' '}
          {isLoadingClients ? (
            'Loading...'
          ) : user.user ? (
            <>
              {user.user}
              <ButtonCopy valueToCopy={user.user} />
            </>
          ) : (
            <>unknown</>
          )}
        </Typography>
        {user.user && <ClientApiKeysModal token={user.user} />}
      </CardContent>
    </Card>
  );

  const mapAddresses = (ethUserAddress: IEthUserAddressV2) => {
    return (
      <Card key={ethUserAddress.address} className={classes.root}>
        <CardContent>
          <Typography variant="body2">
            <b>Address:</b> {ethUserAddress.address}
          </Typography>
          <br />
          <br />
          <Typography variant="body2">
            <b>Type:</b> {ethUserAddress.type}
          </Typography>
          {ethUserAddress.publicKey && (
            <>
              <br />
              <br />
              <Typography variant="body2">
                <b>Public Key:</b> {ethUserAddress.publicKey || 'unknown'}
              </Typography>{' '}
              <ButtonCopy valueToCopy={ethUserAddress.publicKey} />
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const clientEmailText = client?.email || NOT_FOUND_TEXT;

  return (
    <>
      <Typography className={classes.clientAddress} variant="h6">
        {isLoadingProfile ? address : userName || address}
        {!userName && <ButtonCopy valueToCopy={address} />}
      </Typography>
      {client && client.address && (
        <>
          <ClientBalancesModal currentClient={client} />
          <ClientEditProfileModal currentClient={client} />
          <ButtonCopy
            sx={{ mb: 4, ml: 4 }}
            label="Copy ETH address"
            variant="contained"
            color="secondary"
            valueToCopy={address}
          />
        </>
      )}
      <br />
      <Input
        className={classes.inputComment}
        onChange={onChangeComment}
        onBlur={handleBlurCommentInput}
        onKeyDown={handleKeyDownInputComment}
        value={commentInputValue}
        disabled={isLoadingProfile || isLoadingEditProfile}
        placeholder="Add comment..."
      />
      <br />
      <br />
      <Paper sx={{ p: 5 }}>
        <Typography variant="body2" component="p">
          <b>Email:</b> {isLoadingClients ? skeleton : clientEmailText}
          <ClientEditEmailModal currentClient={client} />
          {client?.status && (
            <>
              <br />
              <br />
              <b>Status:</b> {isLoadingClients ? skeleton : client?.status}
            </>
          )}
        </Typography>
      </Paper>

      {isLoadingClients ? (
        <>
          <br />
          <br />
          <Spinner size={40} centered={false} />
        </>
      ) : (
        currentClient.map(renderMainInfo)
      )}

      {isLoadingUserAddresses ? (
        <>
          <br />
          <br />
          <Spinner size={40} centered={false} />
        </>
      ) : isErrorUserAddresses ? null : (
        userAddressesData?.addresses.map(mapAddresses)
      )}

      <ClientBalances
        totalData={totalData}
        client={client}
        isLoadingClients={isLoadingClients}
        skeleton={skeleton}
        isLoadingRevenue={isLoadingRevenue}
        revenueData={revenueData}
        isLoadingTotal={isLoadingTotal}
      />

      <ClientUserGroups
        userGroups={userGroups}
        isLoadingUserGroups={isLoadingUserGroups}
      />
    </>
  );
};
