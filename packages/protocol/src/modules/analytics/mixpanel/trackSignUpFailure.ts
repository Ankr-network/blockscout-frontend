import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export const trackSignUpFailure = () =>
  trackConnectWalletFlow({ sign_up: false });
