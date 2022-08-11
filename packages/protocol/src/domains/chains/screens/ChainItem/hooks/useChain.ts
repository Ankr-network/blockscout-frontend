import { useQuery } from '@redux-requests/react';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { IApiChain } from 'domains/chains/api/queryChains';
import {
  IPremiumFeatures,
  fetchPremiumChainFeatures,
} from 'domains/chains/actions/fetchPremiumChainFeatures';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';

const { useParams } = ChainsRoutesConfig.chainDetails;

export const useChain = (): IApiChain => {
  const { chainId } = useParams();

  const { data: publicChains } = useQuery<IApiChain[]>({
    defaultData: [],
    type: fetchPublicChains,
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
