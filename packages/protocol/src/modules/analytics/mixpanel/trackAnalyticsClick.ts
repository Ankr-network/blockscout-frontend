import { DashboardClickEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface DashboardClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.ANALYTICS_CLICK;

export const trackAnalyticsClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: DashboardClickTrackingParams) =>
  track<DashboardClickEventProps>({
    event,
    properties: {
      billing,
      wallet_public_address,
      wallet_type,
    },
  });
