import { EndpointGroup } from 'modules/endpoints/types';
import { Chain, ChainSubType } from 'modules/chains/types';

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
  isPremiumLabelHidden?: boolean;
  isFreemiumLabelHidden?: boolean;
}
