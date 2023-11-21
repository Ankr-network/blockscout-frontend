import { ChainType } from 'modules/chains/types';

import { EndpointType } from '../const';

export const getEndpointType = (chainType: ChainType) =>
  chainType as unknown as EndpointType;
