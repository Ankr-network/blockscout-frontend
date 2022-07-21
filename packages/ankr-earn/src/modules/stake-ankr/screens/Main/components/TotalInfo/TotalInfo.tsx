import { Box, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { Button } from 'uiKit/Button';
import { NavLink } from 'uiKit/NavLink';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { ClaimDialog } from '../ClaimDialog';

import { TotalIfnoContent } from './TotalIfnoContent';
import { TotalInfoAmount } from './TotalInfoAmount';
import { useClaim } from './useClaim';
import { useTotalInfo } from './useTotalInfo';
import { useTotalInfoStyles } from './useTotalInfoStyles';

export const TotalInfo = (): JSX.Element => {
  const classes = useTotalInfoStyles();

  const {
    totalStaked,
    totalStakedUsd,
    totalRewards,
    totalRewardsUsd,
    climableRewards,
    climableRewardsUsd,
    isClimableRewardsLoading,
    isTotalStakedLoading,
    isTotalRewardsLoading,
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

  const isPlusButton = !totalStaked.isZero();

  const stakeBtnText = t('stake-ankr.total-info.stake');

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item lg={5} xs={12}>
            <Paper className={classes.paper}>
              <TotalIfnoContent
                amountSlot={
                  <TotalInfoAmount
                    isLoading={isTotalStakedLoading}
                    usdValue={totalStakedUsd}
                    value={totalStaked}
                  />
                }
                buttonSlot={
                  isPlusButton ? (
                    <PlusMinusBtn
                      className={classNames(classes.btn, classes.btnRound)}
                      href={stakeLink}
                      icon="plus"
                      tooltip={stakeBtnText}
                      variant="contained"
                    />
                  ) : (
                    <NavLink
                      className={classNames(classes.btn, classes.btnRegular)}
                      href={stakeLink}
                      variant="contained"
                    >
                      {stakeBtnText}
                    </NavLink>
                  )
                }
                titleSlot={
                  <Typography className={classes.title}>
                    {t('stake-ankr.total-info.staked')}
                  </Typography>
                }
              />
            </Paper>
          </Grid>

          <Grid item lg={7} xs={12}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item md={5} xs={12}>
                  <TotalIfnoContent
                    amountSlot={
                      <TotalInfoAmount
                        isLoading={isTotalRewardsLoading}
                        usdValue={totalRewardsUsd}
                        value={totalRewards}
                      />
                    }
                    titleSlot={
                      <Typography className={classes.title}>
                        {t('stake-ankr.total-info.rewards')}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item className={classes.colWithDevider} md={7} xs={12}>
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
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <ClaimDialog
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
