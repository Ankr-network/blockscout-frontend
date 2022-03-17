import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
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
  isHistoryLoading?: boolean;
  isUnstakeLoading?: boolean;
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
}: IStakingAssetProps): JSX.Element => {
  const classes = useStyles();

  if (isLoading) {
    return <StakingAssetSkeleton />;
  }

  const isHistoryBtnActive = typeof onHistoryBtnClick === 'function';

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
          <Grid item sm xs={12}>
            <NetworkIconText
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
            <Tooltip
              arrow
              title={
                isHistoryBtnActive
                  ? t('dashboard.history-tooltip')
                  : comingSoonTooltip
              }
            >
              <Box component="span" display="flex">
                <IconButton
                  className={classes.openHistory}
                  data-testid="history-button"
                  disabled={!isHistoryBtnActive}
                  onClick={historyClickHandler}
                >
                  {historyButtonIcon}
                </IconButton>
              </Box>
            </Tooltip>
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
