import { useQuery } from '@redux-requests/react';

import {
  fetchPremiumChainFeatures,
  IPremiumFeatures,
} from 'domains/chains/actions/fetchPremiumChainFeatures';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig } from 'domains/chains/routes';

const { useParams } = ChainsRoutesConfig.chainDetails;

export const useChain = (): IApiChain => {
  const { chainId } = useParams();

  const {
    data: { chains: publicChains },
  } = useQuery({
    type: fetchPublicChains,
    defaultData: {},
  });
  const {
    data: { privateChains },
  } = useQuery<IPremiumFeatures>({
    defaultData: {},
    type: fetchPremiumChainFeatures,
  });

  const chains = privateChains || publicChains;
  const chain = chains.find(({ id }) => id === chainId) || chains[0];

  return chain;
};
