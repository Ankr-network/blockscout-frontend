import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { CopyTokenAddress } from '../CopyTokenAddress';
import { NetworkIconText } from '../NetworkIconText';

import { StakingAssetSkeleton } from './StakingAssetSkeleton';
import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  chainId?: BlockchainNetworkId;
  amount?: BigNumber;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
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
    return <StakingAssetSkeleton />;
  }

  const handleHistoryClick = () => {
    if (!isHistoryLoading && onHistoryBtnClick) onHistoryBtnClick();
  };

  const stakeTooltip = isStakeLoading
    ? t('dashboard.stake-loading')
    : t('dashboard.stake-tooltip');

  const unstakeTooltip = isUnstakeLoading
    ? t('dashboard.unstake-loading')
    : t('dashboard.unstake-tooltip');
  const comingSoonTooltip = t('common.tooltips.comingSoon');

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item sm xs={12}>
            <NetworkIconText
              chainId={chainId}
              contract={tokenAddress}
              network={network}
              token={token}
            />
          </Grid>

          {pendingSlot && (
            <Grid item xs="auto">
              {pendingSlot}
            </Grid>
          )}

          <Grid item xs="auto">
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
          </Grid>
        </Grid>
      </Box>

      <Grid container alignItems="center" spacing={2}>
        <Grid item sm xs={12}>
          <Typography className={classes.amount}>
            {amount ? amount.decimalPlaces(DEFAULT_FIXED).toFormat() : '-'}
          </Typography>
        </Grid>

        <Grid item sm="auto" xs={12}>
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
                tooltip={unstakeLink ? unstakeTooltip : comingSoonTooltip}
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
        </Grid>
      </Grid>
    </Paper>
  );
};
