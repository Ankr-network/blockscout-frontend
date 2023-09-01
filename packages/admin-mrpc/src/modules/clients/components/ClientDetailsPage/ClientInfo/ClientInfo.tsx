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
import {
  IEthUserAddressV2,
  IUserTokensResponseEntity,
  UserProject,
  Web3Address,
} from 'multirpc-sdk';

import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
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
  currentClient?: ClientMapped;
  isCurrentClientLoading?: boolean;
  totalData?: IGetUserTotalMapped;
  isLoadingTotal?: boolean;
  userProjectsData?: UserProject[] | null;
  isLoadingUserProjects: boolean;
}

/* eslint-disable max-lines-per-function */
export const ClientInfo = ({
  address,
  currentClient,
  isCurrentClientLoading,
  totalData,
  isLoadingTotal,
  userProjectsData,
  isLoadingUserProjects,
}: IClientInfoProps) => {
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
    client: currentClient,
    isLoadingClients: isCurrentClientLoading,
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
    (token: IUserTokensResponseEntity) => {
      if (isCurrentClientLoading) return 'Loading...';

      if (token.token) {
        return (
          <>
            {token.token}
            <ButtonCopy valueToCopy={token.token} />
          </>
        );
      }

      return <>unknown</>;
    },
    [isCurrentClientLoading],
  );

  const renderMainInfo = (token: IUserTokensResponseEntity) =>
    currentClient && (
      <Card
        key={currentClient.user || currentClient.address}
        className={classes.root}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <UserTypeTag
              clientType={currentClient.clientType}
              clientTtl={currentClient.ttl}
            />
          </Box>
          <br />
          <Typography variant="body2" component="p" style={{ marginRight: 16 }}>
            <b>Created:</b>{' '}
            {currentClient?.createdDate?.toLocaleString() || 'unknown'}
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            <b>Token:</b> {renderClient(token)}
          </Typography>
          {currentClient.user && (
            <ClientApiKeysModal token={currentClient.user} />
          )}
        </CardContent>
      </Card>
    );

  const renderClientEmail = useMemo(() => {
    if (currentClient?.email) {
      return (
        <>
          <b>Email:</b> {currentClient?.email}
        </>
      );
    }

    if (isCurrentClientLoading) {
      return skeleton;
    }

    return NOT_FOUND_TEXT;
  }, [currentClient?.email, isCurrentClientLoading, skeleton]);

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
      {currentClient && currentClient.address && (
        <>
          <ClientBalancesModal currentClient={currentClient} />
          <ClientEditProfileModal currentClient={currentClient} />
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
          <ClientEditEmailModal currentClient={currentClient} />
          {currentClient?.status && (
            <>
              <br />
              <br />
              <b>Status:</b>{' '}
              {isCurrentClientLoading ? skeleton : currentClient?.status}
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

      {isCurrentClientLoading ? (
        <>
          <br />
          <br />
          <Spinner size={40} centered={false} />
        </>
      ) : (
        currentClient?.tokens?.map(renderMainInfo)
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
