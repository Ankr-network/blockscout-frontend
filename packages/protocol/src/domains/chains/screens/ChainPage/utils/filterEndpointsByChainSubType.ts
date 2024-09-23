import { ZETACHAIN_ATHENS3_CHAINS, ChainSubType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';

interface FilterEndpointsByChainSubTypeParams {
  groupEndpoints: EndpointGroup[];
  chainSubType?: ChainSubType;
}

export const filterEndpointsByChainSubType = ({
  chainSubType,
  groupEndpoints,
}: FilterEndpointsByChainSubTypeParams) => {
  return groupEndpoints.filter(endpoint => {
    if (chainSubType === ChainSubType.Athens3) {
      return endpoint.chains.some(endpointChain =>
        ZETACHAIN_ATHENS3_CHAINS.includes(endpointChain.id),
      );
    }

    return true;
  });
};
