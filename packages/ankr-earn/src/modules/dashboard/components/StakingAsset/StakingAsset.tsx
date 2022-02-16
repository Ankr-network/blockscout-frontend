import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { ReactNode } from 'react';
import { Button } from 'uiKit/Button';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { Tooltip } from 'uiKit/Tooltip';
import { NetworkIconText } from '../NetworkIconText';
import { ReactComponent as HistoryIcon } from './assets/history.svg';
import { StakingAssetSkeleton } from './StakingAssetSkeleton';
import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  amount?: BigNumber;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
  pendingSlot?: ReactNode;
  isLoading?: boolean;
  isStakeLoading?: boolean;
  isUnstakeLoading?: boolean;
  isHistoryLoading?: boolean;
  onHistoryBtnClick?: () => void;
}

export const StakingAsset = ({
  network,
  token,
  tokenAddress,
  amount,
  tradeLink,
  stakeLink,
  unstakeLink,
  pendingSlot,
  isLoading = false,
  isStakeLoading = false,
  isUnstakeLoading = false,
  isHistoryLoading = false,
  onHistoryBtnClick,
}: IStakingAssetProps) => {
  const classes = useStyles();

  if (isLoading) {
    return <StakingAssetSkeleton />;
  }

  const historyButtonIcon = isHistoryLoading ? (
    <Spinner size={18} variant="circle" />
  ) : (
    <HistoryIcon />
  );

  const historyClickHandler = () => {
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
          <Grid item xs={12} sm>
            <NetworkIconText
              network={network}
              token={token}
              contract={tokenAddress}
            />
          </Grid>

          {pendingSlot && (
            <Grid item xs="auto">
              {pendingSlot}
            </Grid>
          )}

          {typeof onHistoryBtnClick === 'function' && (
            <Grid item xs="auto">
              <IconButton
                className={classes.openHistory}
                onClick={historyClickHandler}
              >
                {historyButtonIcon}
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm>
          <Typography className={classes.amount}>
            {amount ? amount.decimalPlaces(DEFAULT_FIXED).toFormat() : '-'}
          </Typography>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <PlusMinusBtn
                href={stakeLink}
                disabled={!stakeLink}
                isLoading={isStakeLoading}
                tooltip={stakeLink ? stakeTooltip : comingSoonTooltip}
              />
            </Grid>

            <Grid item>
              <PlusMinusBtn
                href={unstakeLink}
                disabled={!unstakeLink}
                isLoading={isUnstakeLoading}
                icon="minus"
                tooltip={unstakeLink ? unstakeTooltip : comingSoonTooltip}
              />
            </Grid>

            <Grid item>
              {tradeLink ? (
                <NavLink
                  variant="outlined"
                  className={classes.tradeButton}
                  href={tradeLink}
                >
                  {t('dashboard.trade')}
                </NavLink>
              ) : (
                <Tooltip title={comingSoonTooltip} arrow>
                  <Box display="flex" component="span">
                    <Button
                      variant="outlined"
                      className={classes.tradeButton}
                      disabled
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
