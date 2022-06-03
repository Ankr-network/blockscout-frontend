import { useMutation, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { EPolkadotNetworkId } from 'provider';

import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from 'modules/auth/polkadot/hooks/usePolkadotNetworks';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchPolkadotAccountMaxSafeBalance } from 'modules/stake-polkadot/actions/fetchPolkadotAccountMaxSafeBalance';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { RoutesConfig as StakePolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { DotIcon } from 'uiKit/Icons/DotIcon';

import { IUseStakableToken } from '../types';

export const useStakableWND = (): IUseStakableToken<IPolkadotNetwork> => {
  const networks = usePolkadotNetworks();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: polkadotBalance, loading: loadingStats } = useQuery({
    type: fetchPolkadotAccountMaxSafeBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
  });

  const { data: metrics, loading: loadingAPY } = useQuery({ type: getMetrics });

  const networksData = useMemo(
    () =>
      networks.filter(({ chainId }) => chainId === EPolkadotNetworkId.westend),
    [networks],
  );

  const apy = metrics ? +metrics.wnd.apy : 0;
  const balance = polkadotBalance ?? ZERO;

  return {
    apy,
    balance,
    href: StakePolkadotRoutes.stake.generatePath(EPolkadotNetworks.WND),
    icon: <DotIcon />,
    isLoading: loadingStats || loadingAPY,
    isShowed: !balance.isZero(),
    isStakeLoading,
    networks: networksData,
    token: Token.WND,
  };
};
