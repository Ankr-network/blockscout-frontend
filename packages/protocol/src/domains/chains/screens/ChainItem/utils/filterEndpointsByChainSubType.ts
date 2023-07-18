import { ChainsAthens2, ChainsAthens3, ChainSubType } from '../../../types';
import { EndpointGroup } from 'modules/endpoints/types';

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
        ChainsAthens2.includes(endpointChain.id),
      );
    }

    if (chainSubType === ChainSubType.Athens3) {
      return endpoint.chains.some(endpointChain =>
        ChainsAthens3.includes(endpointChain.id),
      );
    }

    return true;
  });
};
