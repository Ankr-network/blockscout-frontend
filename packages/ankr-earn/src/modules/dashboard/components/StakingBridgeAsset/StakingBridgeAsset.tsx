import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { BlockchainNetworkId } from 'provider';

import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { CopyTokenAddress } from '../CopyTokenAddress';
import { NetworkIconText } from '../NetworkIconText';
import { StakingAssetSkeleton } from '../StakingAsset/StakingAssetSkeleton';

import { useStakingBridgeAssetStyles as useStyles } from './useStakingBridgeAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  amount?: BigNumber;
  chainId?: BlockchainNetworkId;
  tradeLink?: string;
  pendingSlot?: ReactNode;
  isLoading?: boolean;
  onAddTokenToWallet: () => void;
}

export const StakingBridgeAsset = ({
  network,
  token,
  tokenAddress,
  chainId,
  amount,
  tradeLink,
  pendingSlot,
  isLoading = false,
  onAddTokenToWallet,
}: IStakingAssetProps): JSX.Element => {
  const classes = useStyles();

  if (isLoading) {
    return <StakingAssetSkeleton />;
  }

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
              <NavLink
                className={classes.tradeButton}
                href={BridgeRoutes.main.generatePath()}
                variant="outlined"
              >
                {t('stake.bridge-btn')}
              </NavLink>
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
