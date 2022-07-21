import { Box, SvgIcon } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { NavLink } from 'uiKit/NavLink';
import { Tooltip } from 'uiKit/Tooltip';

import { Amount } from '../Amount';

import { ReactComponent as ExclamationIcon } from './assets/exclamation-mark.svg';
import { useUnclaimedAssetStyles } from './useUnclaimedAssetStyles';

interface IUnclaimedAssetProps {
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
  claimLink: string;
  claimToken?: string;
  isLoading: boolean;
  network?: string;
  token: Token;
  usdAmount?: BigNumber;
}

export const UnclaimedAsset = ({
  amount,
  chainId,
  claimLink,
  claimToken,
  isLoading,
  network,
  token,
  usdAmount,
}: IUnclaimedAssetProps): JSX.Element => {
  const classes = useUnclaimedAssetStyles();

  const isWithUSDAmount = !!usdAmount;

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  return (
    <DashboardCard
      amountSlot={
        <Amount
          infoSlot={
            isWithUSDAmount &&
            t('unit.usd-value', {
              value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
            })
          }
          infoTooltip={isWithUSDAmount && t('dashboard.usd-tooltip')}
          value={amount}
        />
      }
      badgeSlot={
        <div className={classes.badge}>
          <SvgIcon
            className={classes.badgeIcon}
            component={ExclamationIcon}
            viewBox="0 0 18 18"
          />

          {t('dashboard.card.claiming-info')}
        </div>
      }
      buttonsSlot={
        <Tooltip arrow title={t('dashboard.card.claiming-tooltip')}>
          <Box width={115}>
            <NavLink fullWidth href={claimLink} variant="outlined">
              {claimToken
                ? t('dashboard.card.claim-token', { token: claimToken })
                : t('dashboard.card.btn-claim')}
            </NavLink>
          </Box>
        </Tooltip>
      }
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
