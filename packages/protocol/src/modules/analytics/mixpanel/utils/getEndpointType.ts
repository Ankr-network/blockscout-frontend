import { ChainType } from '@ankr.com/chains-list';

import { EndpointType } from '../const';

export const getEndpointType = (chainType: ChainType) =>
  chainType as unknown as EndpointType;
