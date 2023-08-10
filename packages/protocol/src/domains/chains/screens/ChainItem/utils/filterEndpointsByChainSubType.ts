import { EndpointGroup } from 'modules/endpoints/types';

import {
  ZETACHAIN_ATHENS2_CHAINS,
  ZETACHAIN_ATHENS3_CHAINS,
  ChainSubType,
} from '../../../types';

interface FilterEndpointsByChainSubTypeParams {
  groupEndpoints: EndpointGroup[];
  chainSubType?: ChainSubType;
}

export const filterEndpointsByChainSubType = ({
  groupEndpoints,
  chainSubType,
}: FilterEndpointsByChainSubTypeParams) => {
  return groupEndpoints.filter(endpoint => {
    if (chainSubType === ChainSubType.Athens2) {
      return endpoint.chains.some(endpointChain =>
        ZETACHAIN_ATHENS2_CHAINS.includes(endpointChain.id),
      );
    }

    if (chainSubType === ChainSubType.Athens3) {
      return endpoint.chains.some(endpointChain =>
        ZETACHAIN_ATHENS3_CHAINS.includes(endpointChain.id),
      );
    }

    return true;
  });
};
