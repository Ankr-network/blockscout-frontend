import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpointsTabID } from 'modules/common/components/RPCEndpointsTabManager';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useGetNetId = () => {
  const { netId } = ChainsRoutesConfig.chainDetails.useParams();

  return netId;
};

const getInitialTabID = (
  chain: IApiChain,
  netId?: string,
): RPCEndpointsTabID => {
  const { testnets, devnets } = chain;

  const isTestNetTab = testnets?.find(el => netId?.includes(el.id));

  if (isTestNetTab) {
    return RPCEndpointsTabID.TESTNET;
  }

  const isDevNetTab = devnets?.find(el => netId?.includes(el.id));

  if (isDevNetTab) {
    return RPCEndpointsTabID.DEVNET;
  }

  return RPCEndpointsTabID.MAINNET;
};

export const useInitialRPCEndpointsTabID = (chain: IApiChain, netId?: string) =>
  useMemo(() => getInitialTabID(chain, netId), [chain, netId]);
