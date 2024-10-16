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
import {
  IEthUserAddressV2,
  IUserTokensResponseEntity,
  UserProject,
  Web3Address,
} from 'multirpc-sdk';
import { OverlaySpinner as Spinner } from '@ankr.com/ui';

import { LoadableButton } from 'uiKit/LoadableButton';
import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';
import { UserProjectsView } from 'modules/projects/components/UserProjectsView';

import { UserTypeTag } from '../../UserTypeTag';
import { ClientBalancesModal } from '../ClientBalancesModal';
import { useClientInfo } from './hooks/useClientInfo';
import { useClientGroups } from './hooks/useClientGroups';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { ClientEditProfileModal } from '../ClientEditProfileModal';
import { ClientApiKeysModal } from '../ClientApiKeysModal';
import { ClientEditEmailModal } from '../ClientEditEmailModal';
import { ClientBalances } from './ClientBalances';
import { useClientAddresses } from './hooks/useClientAddresses';
import { ClientUserGroups } from './ClientUserGroups';
import { useClientBalances } from './hooks/useClientBalances';
import { NOT_FOUND_TEXT } from '../const';
import { ClientReferralCodes } from './ClientReferralCodes';
import { ClientBundles } from './ClientBundles';
import { useReferralCodes } from './hooks/useReferralCodes';
import { useUserBundles } from './hooks/useUserBundles';

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
    handleDisable2FA,
    isDisable2FALoading,
    userName,
    revenueData,
    isLoadingRevenue,
    isFetchingRevenue,
    is2FAEnabled,
  } = useClientInfo({ address });

  const { userAddressesData, isLoadingUserAddresses, isErrorUserAddresses } =
    useClientAddresses({ address });

  const { userGroups, isLoadingUserGroups } = useClientGroups({ address });

  const { referralCodes, isReferralCodesLoading } = useReferralCodes({
    address,
  });

  const { userActiveBundles, userBundlesStatuses, isUserBundlesLoading } =
    useUserBundles({ address });

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

  const renderMainInfo = useCallback(
    (token: IUserTokensResponseEntity) => {
      if (currentClient) {
        return (
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
              <Typography
                variant="body2"
                component="p"
                style={{ marginRight: 16 }}
              >
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
      }

      return null;
    },
    [classes.root, currentClient, renderClient],
  );

  const renderTokens = useMemo(() => {
    if (isCurrentClientLoading) {
      return (
        <>
          <br />
          <br />
          <Spinner size={40} />
        </>
      );
    }

    if (currentClient?.tokens?.length) {
      return currentClient?.tokens?.map(renderMainInfo);
    }

    return (
      <Card className={classes.root}>
        <CardContent>This client does not have tokens</CardContent>
      </Card>
    );
  }, [
    currentClient?.tokens,
    isCurrentClientLoading,
    renderMainInfo,
    classes.root,
  ]);

  const renderClientEmail = useMemo(() => {
    if (isCurrentClientLoading) {
      return skeleton;
    }

    if (currentClient?.email) {
      return (
        <>
          <b>Email:</b> {currentClient?.email}
        </>
      );
    }

    return NOT_FOUND_TEXT;
  }, [currentClient?.email, isCurrentClientLoading, skeleton]);

  const renderAddress = useMemo(() => {
    if (isLoadingUserAddresses) {
      return (
        <>
          <br />
          <br />
          <Spinner size={40} />
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
          <ClientBalancesModal
            currentClient={currentClient}
            disabled={isCurrentClientLoading}
          />
          <ClientEditProfileModal
            currentClient={currentClient}
            disabled={isCurrentClientLoading}
          />
          <ButtonCopy
            sx={{ mb: 4, ml: 4 }}
            label="Copy ETH address"
            variant="contained"
            color="secondary"
            valueToCopy={address}
            disabled={isCurrentClientLoading}
          />
          {is2FAEnabled && (
            <LoadableButton
              sx={{ mb: 4, ml: 4 }}
              loading={isDisable2FALoading}
              variant="contained"
              color="secondary"
              onClick={handleDisable2FA}
            >
              Disable 2fa
            </LoadableButton>
          )}
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
          <ClientEditEmailModal
            currentClient={currentClient}
            disabled={isCurrentClientLoading}
          />
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

      {renderTokens}

      {renderAddress}

      <ClientBalances
        totalData={totalData}
        clientBalances={clientBalances}
        isLoadingBalances={isCurrentClientLoading || isLoadingBalances}
        skeletonSlot={skeleton}
        isLoadingRevenue={isLoadingRevenue || isFetchingRevenue}
        revenueData={revenueData}
        isLoadingTotal={isLoadingTotal}
      />

      <ClientUserGroups
        userGroups={userGroups}
        isLoadingUserGroups={isLoadingUserGroups}
      />

      <ClientReferralCodes
        currentClient={currentClient}
        referralCodes={referralCodes}
        isLoading={isReferralCodesLoading}
      />

      <ClientBundles
        address={address}
        activeBundles={userActiveBundles}
        bundlesStatuses={userBundlesStatuses}
        isLoading={isUserBundlesLoading}
      />
    </>
  );
};
