import { Box, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t, tHTML } from 'common';

import { Token } from 'modules/common/types/token';
import { TotalStaked } from 'modules/delegate-stake/components/TotalStaked';
import { TotalIfnoContent } from 'modules/delegate-stake/components/TotalStaked/TotalIfnoContent';
import { TotalInfoAmount } from 'modules/delegate-stake/components/TotalStaked/TotalInfoAmount';
import { NavLink } from 'uiKit/NavLink';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

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
    isClaimAllowed,
    claimAllRewardsLink,
    stakeLink,
    epochEnds,
  } = useTotalInfo();

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
                  <NavLink
                    className={classNames(classes.btn, classes.btnRegular)}
                    disabled={!isClaimAllowed}
                    href={claimAllRewardsLink}
                    variant="outlined"
                  >
                    {t('stake-ankr.total-info.claim-all')}
                  </NavLink>
                }
                titleSlot={
                  <Typography className={classes.title}>
                    {t('stake-ankr.total-info.claimable-rewards')}

                    <QuestionWithTooltip>
                      {tHTML('stake-ankr.total-info.claimable-tooltip', {
                        value: epochEnds,
                      })}
                    </QuestionWithTooltip>
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
