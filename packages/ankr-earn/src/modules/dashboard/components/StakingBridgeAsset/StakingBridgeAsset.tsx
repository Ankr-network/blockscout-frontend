import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { EEthereumNetworkId } from 'provider';

import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { CopyTokenAddress } from '../CopyTokenAddress';
import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingBridgeAssetStyles as useStyles } from './useStakingBridgeAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
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
    return <DashboardCardSkeleton />;
  }

  const comingSoonTooltip = t('common.tooltips.comingSoon');

  return (
    <DashboardCard
      amount={amount}
      badgeSlot={pendingSlot}
      buttonsSlot={
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
      }
      menuSlot={
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
      }
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
