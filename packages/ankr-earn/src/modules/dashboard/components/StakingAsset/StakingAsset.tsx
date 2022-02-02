import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { ReactNode } from 'react';
import { NavLink } from 'uiKit/NavLink';
import { Spinner } from 'uiKit/Spinner';
import { NetworkIconText } from '../NetworkIconText';
import { ReactComponent as HistoryIcon } from './assets/history.svg';
import { StakingAssetSkeleton } from './StakingAssetSkeleton';
import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token?: EToken;
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

  const displayLinks = stakeLink || unstakeLink || tradeLink;

  const aMaticbContract = configFromEnv().contractConfig.aMaticbToken;

  const historyButtonIcon = isHistoryLoading ? (
    <Spinner size={18} variant="circle" />
  ) : (
    <HistoryIcon />
  );

  const historyClickHandler = () => {
    if (!isHistoryLoading && onHistoryBtnClick) onHistoryBtnClick();
  };

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm>
            <NetworkIconText
              network={network}
              token={token}
              contract={aMaticbContract}
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

        {displayLinks && (
          <Grid item xs={12} sm="auto">
            <Grid container spacing={2} alignItems="center">
              {stakeLink && (
                <Grid item>
                  <PlusMinusBtn
                    href={stakeLink}
                    isLoading={isStakeLoading}
                    tooltip={
                      isStakeLoading
                        ? t('dashboard.stake-loading')
                        : t('dashboard.stake-tooltip')
                    }
                  />
                </Grid>
              )}
              {unstakeLink && (
                <Grid item>
                  <PlusMinusBtn
                    href={unstakeLink}
                    isLoading={isUnstakeLoading}
                    icon="minus"
                    tooltip={
                      isUnstakeLoading
                        ? t('dashboard.unstake-loading')
                        : t('dashboard.unstake-tooltip')
                    }
                  />
                </Grid>
              )}
              {tradeLink && (
                <Grid item>
                  <NavLink
                    variant="outlined"
                    className={classes.tradeButton}
                    href={tradeLink}
                  >
                    {t('dashboard.trade')}
                  </NavLink>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
