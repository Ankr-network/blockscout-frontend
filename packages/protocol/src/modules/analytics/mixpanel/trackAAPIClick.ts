import { AAPIClickEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface AAPIClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.CLICK_AAPI;

export const trackAAPIClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: AAPIClickTrackingParams) =>
  track<AAPIClickEventProps>({
    event,
    properties: {
      billing,
      wallet_public_address,
      wallet_type,
    },
  });
