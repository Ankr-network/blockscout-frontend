import { ChainType } from 'domains/chains/types';
import { getEndpointType } from './utils/getEndpointType';
import { trackEnterEndpointsFlow } from './utils/trackEnterEndpointsFlow';

export interface EndpointCopyTrackingParams {
  chainType: ChainType;
  endpointUrl: string;
  hasPremium?: boolean;
  walletName: string;
}

export const trackEndpointCopy = ({
  chainType,
  endpointUrl: click_copy_url,
  hasPremium: billing = false,
  walletName: wallet_type,
}: EndpointCopyTrackingParams) =>
  trackEnterEndpointsFlow({
    billing,
    click_copy_url,
    endpoints_type: getEndpointType(chainType),
    wallet_type,
  });
