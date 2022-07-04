import { Box, SvgIcon } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { t } from 'common';

import { Token } from 'modules/common/types/token';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { NavLink } from 'uiKit/NavLink';

import { Amount } from '../Amount';

import { ReactComponent as ExclamationIcon } from './assets/exclamation-mark.svg';
import { useUnclaimedAssetStyles } from './useUnclaimedAssetStyles';

interface IUnclaimedAssetProps {
  isLoading: boolean;
  token: Token;
  claimToken?: string;
  claimLink: string;
  amount?: BigNumber;
  chainId?: EEthereumNetworkId;
  network?: string;
}
export const UnclaimedAsset = ({
  token,
  amount,
  claimLink,
  claimToken,
  isLoading,
  chainId,
  network,
}: IUnclaimedAssetProps): JSX.Element => {
  const classes = useUnclaimedAssetStyles();

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  return (
    <DashboardCard
      amountSlot={<Amount value={amount} />}
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
        <Box width={115}>
          <NavLink fullWidth href={claimLink} variant="outlined">
            {claimToken
              ? t('dashboard.card.claim-token', { token: claimToken })
              : t('dashboard.card.btn-claim')}
          </NavLink>
        </Box>
      }
      networkAndIconSlot={
        <NetworkIconText chainId={chainId} network={network} token={token} />
      }
    />
  );
};
