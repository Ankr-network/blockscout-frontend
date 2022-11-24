import { t } from '@ankr.com/common';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TotalStaked } from 'modules/delegate-stake/components/TotalStaked';
import { TotalIfnoContent } from 'modules/delegate-stake/components/TotalStaked/TotalIfnoContent';
import { TotalInfoAmount } from 'modules/delegate-stake/components/TotalStaked/TotalInfoAmount';
import { NavLink } from 'uiKit/NavLink';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';
import { Tooltip } from 'uiKit/Tooltip';

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
    claimAllRewardsLink,
    stakeLink,
    epochEnds,
    epochLoading,
  } = useTotalInfo();

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item lg={6} xs={12}>
            <TotalStaked
              isTotalStakedLoading={isTotalStakedLoading}
              stakeLink={stakeLink}
              token={Token.ANKR}
              totalStaked={totalStaked}
              totalStakedUsd={totalStakedUsd}
            />
          </Grid>

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
                  featuresConfig.isClaimAndRestakeEnabled ? (
                    <NavLink
                      className={classNames(classes.btn, classes.btnRegular)}
                      href={claimAllRewardsLink}
                      variant="outlined"
                    >
                      {t('stake-ankr.total-info.claim-all')}
                    </NavLink>
                  ) : (
                    <Tooltip arrow title={t('common.tooltips.comingSoon')}>
                      <span>
                        <NavLink
                          disabled
                          className={classNames(
                            classes.btn,
                            classes.btnRegular,
                          )}
                          href={claimAllRewardsLink}
                          variant="outlined"
                        >
                          {t('stake-ankr.total-info.claim-all')}
                        </NavLink>
                      </span>
                    </Tooltip>
                  )
                }
                titleSlot={
                  <Grid
                    container
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Grid item sm xs={12}>
                      <Typography className={classes.title}>
                        {t('stake-ankr.total-info.claimable-rewards')}

                        <QuestionWithTooltip>
                          {t('stake-ankr.total-info.claimable-tooltip')}
                        </QuestionWithTooltip>
                      </Typography>
                    </Grid>

                    <Grid item sm="auto" xs={12}>
                      {epochLoading && <Skeleton width={180} />}

                      {!epochLoading && epochEnds && (
                        <Typography className={classes.epochText}>
                          {t('stake-ankr.total-info.epoch-ends')}

                          <span className={classes.epochValue}>
                            {epochEnds}
                          </span>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
