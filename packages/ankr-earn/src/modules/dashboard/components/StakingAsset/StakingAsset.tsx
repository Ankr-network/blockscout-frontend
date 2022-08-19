import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import {
  DEFAULT_FIXED,
  DEFAULT_ROUNDING,
  nativeTokenMap,
} from 'modules/common/const';
import { EEthereumNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { getAmountInfoTooltip } from 'modules/dashboard/utils/getAmountInfoTooltip';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { Amount } from '../Amount';
import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
  isHistoryLoading?: boolean;
  isLoading?: boolean;
  isShowedTradeLink?: boolean;
  isStakeLoading?: boolean;
  isUnstakeLoading?: boolean;
  nativeAmount?: BigNumber;
  network?: string;
  pendingSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  stakeLink?: string;
  token?: Token;
  tradeLink?: string;
  unstakeLink?: string;
  unstakeTooltip?: string;
  usdAmount?: BigNumber;
  onAddStakingClick?: () => void;
  onHistoryBtnClick?: () => void;
  onTokenInfoClick?: () => void;
  onTradeClick?: () => void;
}

export const StakingAsset = ({
  amount,
  chainId,
  isHistoryLoading = false,
  isLoading = false,
  isShowedTradeLink = true,
  isStakeLoading = false,
  isUnstakeLoading = false,
  nativeAmount,
  network,
  pendingSlot,
  buttonsSlot,
  stakeLink,
  token,
  tradeLink,
  unstakeLink,
  unstakeTooltip,
  usdAmount,
  onAddStakingClick,
  onHistoryBtnClick,
  onTokenInfoClick,
  onTradeClick,
}: IStakingAssetProps): JSX.Element => {
  const classes = useStyles();

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  const amountInfoTooltip = getAmountInfoTooltip(nativeAmount, usdAmount);

  const stakeTooltip = isStakeLoading
    ? t('dashboard.stake-loading')
    : t('dashboard.stake-tooltip');

  const defaultUnstakeTooltip = isUnstakeLoading
    ? t('dashboard.unstake-loading')
    : t('dashboard.unstake-tooltip');

  const comingSoonTooltip = t('common.tooltips.comingSoon');

  const conditionalUnstakeTooltip =
    unstakeTooltip ?? (unstakeLink ? defaultUnstakeTooltip : comingSoonTooltip);

  const handleHistoryClick = () => {
    if (!isHistoryLoading && onHistoryBtnClick) {
      onHistoryBtnClick();
    }
  };

  const isWithNativeAmount = !!(nativeAmount && token);
  const isWithUSDAmount = !!usdAmount;

  const renderAmountInfoSlot = (isWithNativeAmount || isWithUSDAmount) && (
    <>
      {isWithNativeAmount &&
        t('unit.token-value', {
          value: nativeAmount.decimalPlaces(DEFAULT_FIXED).toFormat(),
          token: nativeTokenMap[token],
        })}

      {isWithNativeAmount && isWithUSDAmount && (
        <span className={classes.amountInfoSplitter} />
      )}

      {isWithUSDAmount &&
        t('unit.usd-value', {
          value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
        })}
    </>
  );

  const menuSlot = (
    <Box component="span" display="flex" sx={{ mt: 0.5 }}>
      <Menu>
        <Menu.Item disabled={!onHistoryBtnClick} onClick={handleHistoryClick}>
          {onHistoryBtnClick
            ? t('dashboard.card.stakingHistory')
            : t('dashboard.card.stakingHistoryComingSoon')}
        </Menu.Item>

        <Menu.Item disabled={!onTokenInfoClick} onClick={onTokenInfoClick}>
          {t('dashboard.card.tokenInfo')}
        </Menu.Item>
      </Menu>
    </Box>
  );

  return (
    <DashboardCard
      amountSlot={
        <Amount
          infoSlot={renderAmountInfoSlot}
          infoTooltip={amountInfoTooltip}
          value={amount}
        />
      }
      badgeSlot={pendingSlot}
      buttonsSlot={
        buttonsSlot || (
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
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
              <Grid item className={classes.link}>
                {tradeLink ? (
                  <NavLink
                    className={classes.tradeButton}
                    href={tradeLink}
                    variant="outlined"
                    onClick={onTradeClick}
                  >
                    {t('dashboard.defi')}
                  </NavLink>
                ) : (
                  <Tooltip arrow title={comingSoonTooltip}>
                    <Box component="span" display="flex">
                      <Button
                        disabled
                        className={classes.tradeButton}
                        variant="outlined"
                      >
                        {t('dashboard.defi')}
                      </Button>
                    </Box>
                  </Tooltip>
                )}
              </Grid>
            )}
          </Grid>
        )
      }
      menuSlot={menuSlot}
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
