import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, DEFAULT_FIXED } from 'modules/common/const';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useStakeWithoutClaimETHMutation } from 'modules/stake-eth/actions/stakeWithoutClaim';
import { useGetETHMinStakeQuery } from 'modules/stake-eth/actions/useGetETHMinStakeQuery';
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
  const {
    data: commonData,
    isFetching: isCommonDataLoading,
    refetch: getETHCommonDataRefetch,
  } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const {
    data: claimableData,
    isFetching: isClaimableDataLoading,
    refetch: getETHClaimableDataRefetch,
  } = useGetETHClaimableDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });
  const { data: minStake, isFetching: isMinStakingLoading } =
    useGetETHMinStakeQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const [stake, { isLoading: isStakeLoading }] =
    useStakeWithoutClaimETHMutation();

  const stakeAmount = minStake;
  const isLowBalance =
    minStake && commonData
      ? minStake.isGreaterThanOrEqualTo(commonData.ethBalance)
      : false;

  const onStakeClick = () => {
    if (!stakeAmount) {
      return;
    }
    stake(stakeAmount);
  };

  useProviderEffect(() => {
    getETHCommonDataRefetch();
    getETHClaimableDataRefetch();
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

                {isCommonDataLoading || isMinStakingLoading ? (
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
