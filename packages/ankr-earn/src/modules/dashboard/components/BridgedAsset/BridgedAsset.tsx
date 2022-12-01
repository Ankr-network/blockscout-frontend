import { t } from '@ankr.com/common';
import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { RoutesConfig as BridgeRoutes } from 'modules/bridge/RoutesConfig';
import {
  DEFAULT_FIXED,
  DEFAULT_ROUNDING,
  nativeTokenMap,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { isFirefox } from 'modules/common/utils/isFirefox';
import { getAmountInfoTooltip } from 'modules/dashboard/utils/getAmountInfoTooltip';
import { Menu } from 'uiKit/Menu';
import { NavLink } from 'uiKit/NavLink';

import { Amount } from '../Amount';
import { CopyTokenAddress } from '../CopyTokenAddress';
import { DashboardCard, DashboardCardSkeleton } from '../DashboardCard';
import { NetworkIconText } from '../NetworkIconText';

import { useStakingBridgeAssetStyles } from './useBridgedAssetStyles';

interface IStakingAssetProps {
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
  isLoading?: boolean;
  nativeAmount?: BigNumber;
  network?: string;
  pendingSlot?: ReactNode;
  token: Token;
  tokenAddress?: string;
  tradeLink?: string;
  usdAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const BridgedAsset = ({
  amount,
  chainId,
  isLoading = false,
  nativeAmount,
  network,
  pendingSlot,
  token,
  tokenAddress,
  tradeLink,
  usdAmount,
  onAddTokenToWallet,
}: IStakingAssetProps): JSX.Element => {
  const classes = useStakingBridgeAssetStyles();

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  const amountInfoTooltip = getAmountInfoTooltip(nativeAmount, usdAmount);

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
    <Menu>
      <CopyTokenAddress address={tokenAddress ?? ''} />

      {!isFirefox ? (
        <Menu.Item onClick={onAddTokenToWallet}>
          {t('dashboard.card.addToWallet')}
        </Menu.Item>
      ) : null}
    </Menu>
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
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid item className={classes.wrapper}>
            <NavLink
              className={classes.tradeButton}
              color="primary"
              href={BridgeRoutes.main.generatePath()}
              variant="outlined"
            >
              {t('stake.bridge-btn')}
            </NavLink>
          </Grid>

          {tradeLink && (
            <Grid item className={classes.wrapper}>
              <NavLink
                className={classes.tradeButton}
                color="primary"
                href={tradeLink}
                variant="outlined"
              >
                {t('dashboard.defi')}
              </NavLink>
            </Grid>
          )}
        </Grid>
      }
      menuSlot={menuSlot}
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
