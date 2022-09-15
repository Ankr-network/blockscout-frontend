import { Box, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t, tHTML } from 'common';

import { configFromEnv } from 'modules/api/config';
import {
  DEFAULT_ROUNDING,
  DOCS_MGNO_TOKEN_STAKING_LINK,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';

import { useStakedMGNOData } from '../StakedTokens/hooks/MGNO/useStakedMGNOData';

import { useStakedMGNOStyles } from './useStakedMGNOStyles';

export const StakedMGNO = (): JSX.Element => {
  const { contractConfig } = configFromEnv();
  const classes = useStakedMGNOStyles();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    stakedAmount,
    stakedUsdEquivalent,
    rewardsAmount,
    rewardsUsdEquivalent,
    network,
    manageLink,
    loading,
  } = useStakedMGNOData();

  if (loading) {
    return <DashboardCardSkeleton />;
  }

  const renderUsdAmount = (value: BigNumber) =>
    t('unit.usd-value', {
      value: value.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    });

  return (
    <>
      <DashboardCard
        amountSlot={
          <Grid container spacing={2}>
            {stakedAmount && (
              <Grid item xs>
                <Typography
                  className={classes.amountTitle}
                  color="textSecondary"
                >
                  {t('dashboard.card.staked')}
                </Typography>

                <Amount
                  infoSlot={renderUsdAmount(stakedUsdEquivalent)}
                  value={stakedAmount}
                />
              </Grid>
            )}

            {rewardsAmount && (
              <Grid item xs>
                <Typography
                  className={classes.amountTitle}
                  color="textSecondary"
                >
                  {t('dashboard.card.rewards')}
                </Typography>

                <Amount
                  infoSlot={renderUsdAmount(rewardsUsdEquivalent)}
                  value={rewardsAmount}
                />
              </Grid>
            )}
          </Grid>
        }
        buttonsSlot={
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item xs={12}>
              <NavLink
                className={classes.manageButton}
                href={manageLink}
                variant="outlined"
              >
                {t('dashboard.card.manage')}
              </NavLink>
            </Grid>
          </Grid>
        }
        menuSlot={
          <Box component="span" display="flex">
            <Menu>
              <Menu.Item disabled={!onOpenInfo} onClick={onOpenInfo}>
                {t('dashboard.card.tokenInfo')}
              </Menu.Item>
            </Menu>
          </Box>
        }
        networkAndIconSlot={
          <NetworkIconText network={network} token={Token.mGNO} />
        }
      />

      <TokenInfoDialog
        description={tHTML('dashboard.token-info.MGNO')}
        moreHref={DOCS_MGNO_TOKEN_STAKING_LINK}
        open={isOpenedInfo}
        tokenAddress={contractConfig.mGNOToken}
        tokenName={Token.mGNO}
        onClose={onCloseInfo}
      />
    </>
  );
};
