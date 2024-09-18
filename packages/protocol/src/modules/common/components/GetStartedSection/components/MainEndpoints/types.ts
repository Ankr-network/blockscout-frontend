import { Chain, ChainSubType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';

import { EndpointProps } from '../Endpoint';

export enum Feature {
  REST,
  RPC,
  ENTERPRISE,
}

export interface MainEndpointsProps {
  feature?: Feature;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  hasConnectWalletMessage: boolean;
  hasPremium: boolean;
  hasPrivateAccess: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
  publicChain: Chain;
}
