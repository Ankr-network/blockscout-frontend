import { Web2ConnectTrackingParams } from './types';
import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export const trackWeb2ConnectFailure = ({
  email: google_account,
  hasPremium: billing = false,
}: Web2ConnectTrackingParams) =>
  trackConnectWalletFlow({
    billing,
    google_account,
    sign_up: false,
    web2_connect: true,
  });
