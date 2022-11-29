import {
  CardContent,
  Typography,
  Box,
  Card,
  Skeleton,
  Grid,
  Paper,
  Input,
} from '@mui/material';

import { Spinner } from 'ui';
import { Web3Address } from 'multirpc-sdk';

import { ButtonCopy } from 'uiKit/ButtonCopy/ButtonCopy';
import {
  formatNumber,
  renderBalance,
  renderUSD,
} from 'modules/common/utils/renderBalance';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { IGetUserTotalMapped } from 'modules/clients/actions/fetchUserTotal';

import { UserTypeTag } from '../../UserTypeTag';
import { ClientBalancesModal } from '../ClientBalancesModal';
import { useClientInfo } from './useClientInfo';
import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { ClientEditProfileModal } from '../ClientEditProfileModal';
import { ClientApiKeysModal } from '../ClientApiKeysModal';

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
    <Card key={user.user} className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <UserTypeTag clientType={user.clientType} clientTtl={user.ttl} />
        </Box>
        <br />
        <Typography variant="body2" component="p" style={{ marginRight: 16 }}>
          <b>Created:</b> {user?.createdDate?.toLocaleString()}
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
        <ClientApiKeysModal token={user.user} />
      </CardContent>
    </Card>
  );

  const NOT_FOUND_TEXT = 'Not found';
  const statsFromText = totalData?.startedDate
    ? `from ${totalData.startedDate.toLocaleString()}`
    : undefined;
  const totalRequestsText =
    formatNumber(totalData?.blockchainsInfo?.totalCount) || NOT_FOUND_TEXT;
  const totalCostText = Number(totalData?.blockchainsInfo?.totalCost)
    ? `${formatNumber(totalData?.blockchainsInfo.totalCost)}`
    : NOT_FOUND_TEXT;
  const clientEmailText = client?.email || NOT_FOUND_TEXT;
  const voucherCreditsText = client?.voucherAmount ? (
    <>{renderBalance(client?.voucherAmount)} Voucher Credits</>
  ) : null;

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
        placeholder="No comment added..."
      />
      <br />
      <br />
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
            {isLoadingRevenue ? (
              skeleton
            ) : (
              <b>{renderUSD(revenueData?.usdFact)}</b>
            )}
          </Typography>
          <Typography variant="caption" component="p">
            {isLoadingRevenue
              ? skeleton
              : `${renderBalance(revenueData?.ankrFact)} ANKR`}
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Total cost
          </Typography>

          <Typography variant="subtitle1" component="p">
            <b>{isLoadingTotal ? skeleton : totalCostText}</b>
          </Typography>
          <Typography variant="caption" component="p">
            {isLoadingTotal ? skeleton : statsFromText}
          </Typography>
        </Grid>

        <Grid item xs={3} component={Paper} className={classes.gridItem}>
          <Typography variant="caption" color="textSecondary" component="p">
            Total requests
          </Typography>

          <Typography variant="subtitle1" component="p">
            <b>{isLoadingTotal ? skeleton : totalRequestsText}</b>
          </Typography>
          <Typography variant="caption" component="p">
            {isLoadingTotal ? skeleton : statsFromText}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
