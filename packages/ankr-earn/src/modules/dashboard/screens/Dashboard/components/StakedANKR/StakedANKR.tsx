import { t } from '@ankr.com/common';
import { Box, Grid, Typography } from '@material-ui/core';

import { trackDelegatedStakingFlow } from 'modules/analytics/tracking-actions/trackDelegatedStakingFlow';
import { DEFAULT_ROUNDING, ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import { DashboardCard } from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';

import { AnkrInfoDialog } from '../AnkrInfoDialog';

import { useStakedANKRData } from './useStakedANKRData';
import { useStakedANKRStyles } from './useStakedANKRStyles';

export const StakedANKR = (): JSX.Element => {
  const classes = useStakedANKRStyles();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const {
    stakedAmount,
    rewardsAmount,
    stakedUsdEquivalent,
    rewardsUsdEquivalent,
    manageLink,
    address,
    walletName,
  } = useStakedANKRData();

  const stakedUsdValue = t('unit.usd-value', {
    value: stakedUsdEquivalent.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
  });

  const rewardsUsdValue = t('unit.usd-value', {
    value: rewardsUsdEquivalent.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
  });

  const onClick = () => {
    trackDelegatedStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'dashboard',
      tokenName: Token.ANKR,
    });
  };

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

                <Amount infoSlot={stakedUsdValue} value={stakedAmount} />
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

                <Amount infoSlot={rewardsUsdValue} value={rewardsAmount} />
              </Grid>
            )}
          </Grid>
        }
        buttonsSlot={
          <NavLink
            className={classes.manageButton}
            href={manageLink}
            variant="outlined"
            onMouseDown={onClick}
            onTouchStart={onClick}
          >
            {t('dashboard.card.manage')}
          </NavLink>
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
          <NetworkIconText chainId={ETH_NETWORK_BY_ENV} token={Token.ANKR} />
        }
      />

      <AnkrInfoDialog isOpened={isOpenedInfo} onClose={onCloseInfo} />
    </>
  );
};
