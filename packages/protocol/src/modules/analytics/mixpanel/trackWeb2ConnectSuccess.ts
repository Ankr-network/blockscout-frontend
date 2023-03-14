import { Web2ConnectTrackingParams } from './types';
import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export const trackWeb2ConnectSuccess = ({
  email: google_account,
  hasPremium: billing = false,
}: Web2ConnectTrackingParams) =>
  trackConnectWalletFlow({
    billing,
    google_account,
    sign_up: true,
    web2_connect: true,
  });
