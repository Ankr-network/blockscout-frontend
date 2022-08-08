import { useQuery } from '@redux-requests/react';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import {
  IPremiumFeatures,
  fetchPremiumChainFeatures,
} from 'domains/chains/actions/fetchPremiumChainFeatures';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { getEvmEndpoint } from 'modules/endpoints/utils/getEvmEndpoint';
import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';

const { useParams } = ChainsRoutesConfig.chainDetails;

export const useEndpoints = (): IApiChainURL | undefined => {
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

  const endpoints = useGroupedEndpoints(chain);

  return getEvmEndpoint(endpoints);
};
