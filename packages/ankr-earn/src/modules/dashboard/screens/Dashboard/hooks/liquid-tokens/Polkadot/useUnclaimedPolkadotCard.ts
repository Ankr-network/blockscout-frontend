import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { featuresConfig, STAKE_LEGACY_LINKS, ZERO } from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { RoutesConfig } from 'modules/stake-polkadot/Routes';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IUseClaimedPolkadotCardProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IUseClaimedPolkadotCard {
  amount: BigNumber;
  claimLink: string;
  ethToken: TPolkadotETHToken;
  isLoading: boolean;
  networkTxt: string;
  polkadotToken: TPolkadotToken;
  usdAmount?: BigNumber;
}

export const useUnclaimedPolkadotCard = ({
  ethToken,
  network,
  polkadotToken,
}: IUseClaimedPolkadotCardProps): IUseClaimedPolkadotCard => {
  const { data: claimableBalance, loading: isLoading } = useQuery({
    type: fetchETHTokenClaimableBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = claimableBalance?.claimable ?? ZERO;
  const usdAmount = useMemo(() => {
    const serviceName = EMetricsServiceName[network];

    return getUSDAmount({
      amount,
      totalStaked: metrics?.[serviceName]?.totalStaked,
      totalStakedUsd: metrics?.[serviceName]?.totalStakedUsd,
    });
  }, [amount, metrics, network]);

  const claimLink =
    featuresConfig.isActivePolkadotStaking &&
    featuresConfig.isActivePolkadotClaiming
      ? RoutesConfig.claim.generatePath(network)
      : STAKE_LEGACY_LINKS[polkadotToken] ?? '';

  const networkTxt = useMemo(
    () =>
      t('dashboard.card.network-info', {
        network: t(`stake-polkadot.networks.${network}`),
      }),
    [network],
  );

  return {
    amount,
    claimLink,
    ethToken,
    isLoading,
    networkTxt,
    polkadotToken,
    usdAmount,
  };
};
