import { Box, Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { t } from 'common';
import { EEthereumNetworkId } from 'provider';

import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { nativeTokenMap } from 'modules/dashboard/const';
import { Button } from 'uiKit/Button';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { CopyTokenAddress } from '../CopyTokenAddress';
import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingBridgeAssetStyles as useStyles } from './useBridgedAssetStyles';

interface IStakingAssetProps {
  token?: Token;
  tokenAddress?: string;
  network?: string;
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
  tradeLink?: string;
  pendingSlot?: ReactNode;
  isLoading?: boolean;
  nativeAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const BridgedAsset = ({
  network,
  token,
  tokenAddress,
  chainId,
  amount,
  tradeLink,
  pendingSlot,
  nativeAmount,
  isLoading = false,
  onAddTokenToWallet,
}: IStakingAssetProps): JSX.Element => {
  const classes = useStyles();

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  const comingSoonTooltip = t('common.tooltips.comingSoon');

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
      amountInfoSlot={nativeAmountText}
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
