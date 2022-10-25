import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { DEFAULT_FIXED } from 'modules/common/const';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stakeWithoutClaim } from 'modules/stake-eth/actions/stakeWithoutClaim';
import { RoutesConfig as ETHRoutesConfig } from 'modules/stake-eth/Routes';
import { TestBox } from 'modules/testing-ui/components/TestBox';
import { Button } from 'uiKit/Button';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';

/**
 * This screen is only for creating a testing ability.
 * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
 */
export const StakeWithoutClaim = (): JSX.Element => {
  const dispatchRequest = useDispatchRequest();
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });
  const { data: claimableData, loading: isClaimableDataLoading } = useQuery({
    type: getClaimableData,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeWithoutClaim });

  const stakeAmount = commonData?.minStake;
  const isLowBalance = commonData
    ? commonData.minStake.isGreaterThanOrEqualTo(commonData.ethBalance)
    : false;

  const onStakeClick = () => {
    if (!stakeAmount) {
      return;
    }
    dispatchRequest(stakeWithoutClaim(stakeAmount));
  };

  useProviderEffect(() => {
    dispatchRequest(getCommonData());
    dispatchRequest(getClaimableData());
  }, []);

  return (
    <TestBox>
      <Typography variant="h3">Stake without claim</Typography>

      <List component="nav">
        <ListItem>
          <ListItemIcon>
            <EthIcon size="md" />
          </ListItemIcon>

          <ListItemText
            primary={
              <>
                {commonData
                  ? commonData.ethBalance
                      .decimalPlaces(DEFAULT_FIXED)
                      .toFormat()
                  : 0}

                {isCommonDataLoading ? (
                  <Box component="span" ml={2}>
                    <Spinner size={16} />
                  </Box>
                ) : null}
              </>
            }
            secondary="ETH Balance"
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <AETHBIcon size="md" />
          </ListItemIcon>

          <ListItemText
            primary={
              <>
                {claimableData
                  ? claimableData.claimableAETHB
                      .decimalPlaces(DEFAULT_FIXED)
                      .toFormat()
                  : 0}

                {isClaimableDataLoading ? (
                  <Box component="span" ml={2}>
                    <Spinner size={16} />
                  </Box>
                ) : null}
              </>
            }
            secondary="Unclaimed Balance"
          />
        </ListItem>
      </List>

      <Box my={2}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Button
              disabled={!stakeAmount || isStakeLoading || isLowBalance}
              isLoading={isStakeLoading}
              onClick={onStakeClick}
            >
              Stake {stakeAmount?.toFormat()} ETH
            </Button>
          </Grid>

          <Grid item>
            <Typography color="error" variant="body2">
              {isLowBalance && 'Low balance'}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <NavLink
            endIcon="↗️"
            href={ETHRoutesConfig.claim.generatePath()}
            variant="outlined"
          >
            Go claim
          </NavLink>
        </Grid>

        <Grid item>
          <NavLink
            endIcon="↗️"
            href={ETHRoutesConfig.stake.generatePath()}
            variant="outlined"
          >
            Go stake
          </NavLink>
        </Grid>
      </Grid>
    </TestBox>
  );
};
