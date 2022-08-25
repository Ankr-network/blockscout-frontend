import { Box, Grid, Paper, Typography } from '@material-ui/core';

import { t, tHTML } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { Token } from 'modules/common/types/token';
import { TotalStaked } from 'modules/delegate-stake/components/TotalStaked';
import { TotalIfnoContent } from 'modules/delegate-stake/components/TotalStaked/TotalIfnoContent';
import { TotalInfoAmount } from 'modules/delegate-stake/components/TotalStaked/TotalInfoAmount';

import { useClaim } from './useClaim';
import { useTotalInfo } from './useTotalInfo';
import { useTotalInfoStyles } from './useTotalInfoStyles';

export const TotalInfo = (): JSX.Element => {
  const classes = useTotalInfoStyles();

  const {
    totalStaked,
    totalStakedUsd,
    climableRewards,
    climableRewardsUsd,
    isClimableRewardsLoading,
    isTotalStakedLoading,
    stakeLink,
  } = useTotalInfo();

  const { isClaimAllowed, onOpen: onOpenClaim } = useClaim();

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={3}>
          <TotalStaked
            isTotalStakedLoading={isTotalStakedLoading}
            stakeLink={stakeLink}
            token={Token.mGNO}
            totalStaked={totalStaked}
            totalStakedUsd={totalStakedUsd}
          />

          <Grid item lg={6} xs={12}>
            <Paper className={classes.paper}>
              <TotalIfnoContent
                amountSlot={
                  <TotalInfoAmount
                    isLoading={isClimableRewardsLoading}
                    usdValue={climableRewardsUsd}
                    value={climableRewards}
                  />
                }
                buttonSlot={
                  <PlusMinusBtn
                    disabled={!isClaimAllowed}
                    icon="minus"
                    tooltip={tHTML('stake-mgno.staking.lock-info')}
                    variant="outlined"
                    onClick={onOpenClaim}
                  />
                }
                titleSlot={
                  <Typography className={classes.title}>
                    {t('stake-mgno.total-info.total-rewards')}
                  </Typography>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
