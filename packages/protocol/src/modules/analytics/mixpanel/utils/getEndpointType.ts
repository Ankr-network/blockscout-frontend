import { ChainType } from 'domains/chains/types';

import { EndpointType } from '../const';

export const getEndpointType = (chainType: ChainType) =>
  chainType as unknown as EndpointType;
