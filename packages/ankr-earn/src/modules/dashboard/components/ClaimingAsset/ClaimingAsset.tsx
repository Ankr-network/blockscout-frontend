import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { ExclamationMarkIcon } from 'uiKit/Icons/ExclamationMarkIcon';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { NetworkIconText } from '../NetworkIconText';

import { ClaimingAssetSkeleton } from './ClaimingAssetSkeleton';
import { useClaimingAssetStyles } from './useClaimingAssetStyles';

interface IClaimingAssetProps {
  amount?: BigNumber;
  claimLink?: string;
  claimToken: Token;
  isLoading?: boolean;
  network?: string;
  token: Token;
  tokenAddress?: string;
  onAddClaimingClick?: () => void;
}

export const ClaimingAsset = ({
  amount,
  claimLink,
  claimToken,
  isLoading = false,
  network,
  token,
  tokenAddress,
  onAddClaimingClick,
}: IClaimingAssetProps): JSX.Element => {
  const classes = useClaimingAssetStyles();

  if (isLoading) {
    return <ClaimingAssetSkeleton />;
  }

  const claimTooltip = t('dashboard.claim-tooltip');
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

          <Grid item xs="auto">
            <Box className={classes.infoLabel}>
              <ExclamationMarkIcon size={18} />

              <Typography className={classes.infoLabelTxt} variant="subtitle1">
                {t('dashboard.card.claiming-info')}
              </Typography>
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
              {claimLink ? (
                <Tooltip arrow title={claimTooltip}>
                  <Box component="span" display="flex">
                    <NavLink
                      className={classes.claimBtn}
                      href={claimLink}
                      variant="outlined"
                      onClick={onAddClaimingClick}
                    >
                      {t('dashboard.claim-token', {
                        token: claimToken,
                      })}
                    </NavLink>
                  </Box>
                </Tooltip>
              ) : (
                <Tooltip arrow title={comingSoonTooltip}>
                  <Box component="span" display="flex">
                    <Button
                      disabled
                      className={classes.claimBtn}
                      variant="outlined"
                    >
                      {t('dashboard.claim-token', {
                        token: claimToken,
                      })}
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
