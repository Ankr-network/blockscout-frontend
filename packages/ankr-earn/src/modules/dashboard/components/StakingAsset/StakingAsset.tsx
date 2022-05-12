import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { EEthereumNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { CopyTokenAddress } from '../CopyTokenAddress';
import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  chainId?: EEthereumNetworkId;
  amount?: BigNumber;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
  unstakeTooltip?: string;
  pendingSlot?: ReactNode;
  isLoading?: boolean;
  isStakeLoading?: boolean;
  onAddTokenToWallet?: () => void;
  isHistoryLoading?: boolean;
  isUnstakeLoading?: boolean;
  onHistoryBtnClick?: () => void;
  onTradeClick?: () => void;
  onAddStakingClick?: () => void;
}

export const StakingAsset = ({
  network,
  token,
  tokenAddress,
  amount,
  chainId,
  tradeLink,
  stakeLink,
  unstakeLink,
  pendingSlot,
  unstakeTooltip,
  isLoading = false,
  isStakeLoading = false,
  isUnstakeLoading = false,
  isHistoryLoading = false,
  onHistoryBtnClick,
  onTradeClick,
  onAddStakingClick,
  onAddTokenToWallet,
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

            <CopyTokenAddress address={tokenAddress ?? ''} />

            {!isFirefox ? (
              <Menu.Item onClick={onAddTokenToWallet}>
                {t('dashboard.card.addToMetamask')}
              </Menu.Item>
            ) : null}
          </Menu>
        </Box>
      }
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
