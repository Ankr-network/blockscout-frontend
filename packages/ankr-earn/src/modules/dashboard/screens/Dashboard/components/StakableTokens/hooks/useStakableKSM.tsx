import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { EPolkadotNetworkId } from '@ankr.com/provider';

import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from 'modules/auth/polkadot/hooks/usePolkadotNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchPolkadotAccountFullBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountFullBalance';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { RoutesConfig as StakePolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';

import { IUseStakableToken } from '../types';

export const useStakableKSM = (): IUseStakableToken<IPolkadotNetwork> => {
  const networks = usePolkadotNetworks();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: polkadotBalance, loading: loadingStats } = useQuery({
    type: fetchPolkadotAccountFullBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
  });

  const { data: metrics, loading: loadingAPY } = useQuery({ type: getMetrics });

  const networksData = useMemo(
    () =>
      networks.filter(({ chainId }) => chainId === EPolkadotNetworkId.kusama),
    [networks],
  );

  const apy = metrics ? +metrics.ksm.apy : 0;
  const balance = polkadotBalance ?? ZERO;

  return {
    apy,
    balance,
    href: StakePolkadotRoutes.stake.generatePath(EPolkadotNetworks.KSM),
    icon: <KsmIcon />,
    isLoading: loadingStats || loadingAPY,
    isShowed: !balance.isZero(),
    isStakeLoading,
    networks: networksData,
    token: Token.KSM,
  };
};
