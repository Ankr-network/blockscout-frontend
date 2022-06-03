import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { EEthereumNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { nativeTokenMap } from 'modules/dashboard/const';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  network?: string;
  chainId?: EEthereumNetworkId;
  amount?: BigNumber;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
  unstakeTooltip?: string;
  pendingSlot?: ReactNode;
  nativeAmount?: BigNumber;
  isLoading?: boolean;
  isShowedTradeLink?: boolean;
  isStakeLoading?: boolean;
  isHistoryLoading?: boolean;
  isUnstakeLoading?: boolean;
  onHistoryBtnClick?: () => void;
  onTokenInfoClick?: () => void;
  onTradeClick?: () => void;
  onAddStakingClick?: () => void;
}

export const StakingAsset = ({
  network,
  token,
  amount,
  chainId,
  tradeLink,
  stakeLink,
  unstakeLink,
  pendingSlot,
  nativeAmount,
  unstakeTooltip,
  isLoading = false,
  isShowedTradeLink = true,
  isStakeLoading = false,
  isUnstakeLoading = false,
  isHistoryLoading = false,
  onHistoryBtnClick,
  onTokenInfoClick,
  onTradeClick,
  onAddStakingClick,
}: IStakingAssetProps): JSX.Element => {
  const classes = useStyles();

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  const handleHistoryClick = () => {
    if (!isHistoryLoading && onHistoryBtnClick) onHistoryBtnClick();
  };

  const stakeTooltip = isStakeLoading
    ? t('dashboard.stake-loading')
    : t('dashboard.stake-tooltip');

  const defaultUnstakeTooltip = isUnstakeLoading
    ? t('dashboard.unstake-loading')
    : t('dashboard.unstake-tooltip');

  const comingSoonTooltip = t('common.tooltips.comingSoon');

  const conditionalUnstakeTooltip =
    unstakeTooltip ?? (unstakeLink ? defaultUnstakeTooltip : comingSoonTooltip);

  const nativeAmountText =
    nativeAmount &&
    token &&
    t('unit.token-value', {
      value: nativeAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
      token: nativeTokenMap[token],
    });

  return (
    <DashboardCard
      amount={amount}
      badgeSlot={pendingSlot}
      buttonsSlot={
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <PlusMinusBtn
              disabled={!stakeLink}
              href={stakeLink}
              isLoading={isStakeLoading}
              tooltip={stakeLink ? stakeTooltip : comingSoonTooltip}
              onClick={onAddStakingClick}
            />
          </Grid>

          <Grid item>
            <PlusMinusBtn
              disabled={!unstakeLink}
              href={unstakeLink}
              icon="minus"
              isLoading={isUnstakeLoading}
              tooltip={conditionalUnstakeTooltip}
            />
          </Grid>

          {isShowedTradeLink && (
            <Grid item>
              {tradeLink ? (
                <NavLink
                  className={classes.tradeButton}
                  href={tradeLink}
                  variant="outlined"
                  onClick={onTradeClick}
                >
                  {t('dashboard.trade')}
                </NavLink>
              ) : (
                <Tooltip arrow title={comingSoonTooltip}>
                  <Box component="span" display="flex">
                    <Button
                      disabled
                      className={classes.tradeButton}
                      variant="outlined"
                    >
                      {t('dashboard.trade')}
                    </Button>
                  </Box>
                </Tooltip>
              )}
            </Grid>
          )}
        </Grid>
      }
      menuSlot={
        <Box component="span" display="flex">
          <Menu>
            <Menu.Item
              disabled={!onHistoryBtnClick}
              onClick={handleHistoryClick}
            >
              {onHistoryBtnClick
                ? t('dashboard.card.stakingHistory')
                : t('dashboard.card.stakingHistoryComingSoon')}
            </Menu.Item>

            <Menu.Item disabled={!onTokenInfoClick} onClick={onTokenInfoClick}>
              {t('dashboard.card.tokenInfo')}
            </Menu.Item>
          </Menu>
        </Box>
      }
      nativeAmountText={nativeAmountText}
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
      tooltip={t('dashboard.amount-tooltip')}
    />
  );
};
