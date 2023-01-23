import { Web2ConnectTrackingParams } from './types';
import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';
import { trackWeb2Connect } from './utils/trackWeb2Connect';

export const trackWeb2ConnectFailure = ({
  email: google_account,
  hasPremium: billing = false,
}: Web2ConnectTrackingParams) => {
  trackWeb2Connect({
    billing,
    google_account,
    user_connected: false,
  });

  trackConnectWalletFlow({ sign_up: false });
};
