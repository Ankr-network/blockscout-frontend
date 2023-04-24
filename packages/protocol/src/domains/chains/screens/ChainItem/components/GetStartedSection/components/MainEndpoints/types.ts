import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointProps } from '../Endpoint';
import { Chain } from 'domains/chains/types';

export enum Feature {
  REST,
  RPC,
}

export interface MainEndpointsProps {
  feature?: Feature;
  group: EndpointGroup;
  hasConnectWalletMessage: boolean;
  hasPremium: boolean;
  hasPrivateAccess: boolean;
  onCopyEndpoint: EndpointProps['onCopy'];
  publicChain: Chain;
}
