import { ChainType } from '@ankr.com/chains-list';

import { EndpointCopyEventProps } from './types';
import { MixpanelEvent } from './const';
import { getEndpointType } from './utils/getEndpointType';
import { track } from './utils/track';

export interface EndpointCopyTrackingParams {
  chainType: ChainType;
  endpointUrl: string;
  hasPremium?: boolean;
  walletName: string;
}

const event = MixpanelEvent.ENTER_ENDPOINTS_FLOW;

export const trackEndpointCopy = ({
  chainType,
  endpointUrl: click_copy_url,
  hasPremium: billing = false,
  walletName: wallet_type,
}: EndpointCopyTrackingParams) =>
  track<EndpointCopyEventProps>({
    event,
    properties: {
      billing,
      click_copy_url,
      endpoints_type: getEndpointType(chainType),
      wallet_type,
    },
  });
