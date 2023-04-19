import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointProps } from '../Endpoint';
import { IApiChain } from 'domains/chains/api/queryChains';

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
  publicChain: IApiChain;
}
