import { Box, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { TotalStaked } from 'modules/delegate-stake/components/TotalStaked';
import { TotalIfnoContent } from 'modules/delegate-stake/components/TotalStaked/TotalIfnoContent';
import { TotalInfoAmount } from 'modules/delegate-stake/components/TotalStaked/TotalInfoAmount';
import { Button } from 'uiKit/Button';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { ClaimAllRewardsDialog } from '../ClaimAllRewardsDialog';

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

  const {
    availableClaims,
    isClaimAllowed,
    usdTokenPrice,
    isClaimLoading,
    isOpened: isOpenedClaim,
    onClose: onCloseClaim,
    onOpen: onOpenClaim,
    onClaim,
  } = useClaim();

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={3}>
          <TotalStaked
            isTotalStakedLoading={isTotalStakedLoading}
            stakeLink={stakeLink}
            token={Token.ANKR}
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
                  <Button
                    className={classNames(classes.btn, classes.btnRegular)}
                    disabled={!isClaimAllowed}
                    variant="outlined"
                    onClick={onOpenClaim}
                  >
                    {t('stake-ankr.total-info.claim-all')}
                  </Button>
                }
                titleSlot={
                  <Typography className={classes.title}>
                    {t('stake-ankr.total-info.claimable-rewards')}

                    <QuestionWithTooltip>
                      {t('stake-ankr.total-info.claimable-tooltip')}
                    </QuestionWithTooltip>
                  </Typography>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <ClaimAllRewardsDialog
        availableClaims={availableClaims}
        claimLoading={isClaimLoading}
        isClaimsLoading={false}
        open={isOpenedClaim}
        usdTokenPrice={usdTokenPrice}
        onClaim={onClaim}
        onClose={onCloseClaim}
      />
    </>
  );
};
