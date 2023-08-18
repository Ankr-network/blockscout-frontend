import { useCallback, useMemo } from 'react';
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
import { IEthUserAddressV2, UserProject, Web3Address } from 'multirpc-sdk';

import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
import { ICountersError } from 'modules/clients/actions/fetchCounters';
import { UserProjectsView } from 'modules/projects/components/UserProjectsView';

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
import { useClientBalances } from './useClientBalances';
import { NOT_FOUND_TEXT } from '../const';

interface IClientInfoProps {
  address: Web3Address;
  currentClient?: ClientMapped[];
  isLoadingClients?: boolean;
  totalData?: IGetUserTotalMapped;
  isLoadingTotal?: boolean;
  clientsErrors?: ICountersError[];
  userProjectsData?: UserProject[] | null;
  isLoadingUserProjects: boolean;
}

/* eslint-disable max-lines-per-function */
export const ClientInfo = ({
  address,
  currentClient = [],
  isLoadingClients,
  totalData,
  isLoadingTotal,
  clientsErrors,
  userProjectsData,
  isLoadingUserProjects,
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

  const { clientBalances, isLoadingBalances } = useClientBalances({
    client,
    isLoadingClients,
    address,
  });

  const { classes } = useStyles();

  const skeleton = useMemo(
    () => (
      <Skeleton
        animation="wave"
        style={{ display: 'inline-block' }}
        variant="rectangular"
        width={100}
        height={16}
      />
    ),
    [],
  );

  const renderClient = useCallback(
    (user: ClientMapped) => {
      if (isLoadingClients) return 'Loading...';

      if (user.user) {
        return (
          <>
            {user.user}
            <ButtonCopy valueToCopy={user.user} />
          </>
        );
      }

      return <>unknown</>;
    },
    [isLoadingClients],
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
          <b>Token:</b> {renderClient(user)}
        </Typography>
        {user.user && <ClientApiKeysModal token={user.user} />}
      </CardContent>
    </Card>
  );

  const renderClientEmail = useMemo(() => {
    if (client?.email) {
      return (
        <>
          <b>Email:</b> {client?.email}
        </>
      );
    }

    if (isLoadingClients) {
      return skeleton;
    }

    if (
      clientsErrors &&
      clientsErrors.length > 0 &&
      clientsErrors.find(error => error.type === 'email')
    ) {
      return <Typography color="error">Client email loading error</Typography>;
    }

    return NOT_FOUND_TEXT;
  }, [client?.email, isLoadingClients, clientsErrors, skeleton]);

  const renderAddress = useMemo(() => {
    if (isLoadingUserAddresses) {
      return (
        <>
          <br />
          <br />
          <Spinner size={40} centered={false} />
        </>
      );
    }

    if (isErrorUserAddresses) return null;

    return userAddressesData?.addresses.map(
      (ethUserAddress: IEthUserAddressV2) => {
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
      },
    );
  }, [
    isLoadingUserAddresses,
    userAddressesData?.addresses,
    isErrorUserAddresses,
    classes.root,
  ]);

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
          {renderClientEmail}
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

      <br />
      <UserProjectsView
        address={address}
        userProjectsData={userProjectsData}
        isLoadingUserProjects={isLoadingUserProjects}
      />

      {isLoadingClients ? (
        <>
          <br />
          <br />
          <Spinner size={40} centered={false} />
        </>
      ) : (
        currentClient.map(renderMainInfo)
      )}

      {renderAddress}

      <ClientBalances
        totalData={totalData}
        clientBalances={clientBalances}
        isLoadingBalances={isLoadingBalances}
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
