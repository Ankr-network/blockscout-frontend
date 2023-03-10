import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export const trackSignUpFailure = () =>
  trackConnectWalletFlow({ billing: false, sign_up: false });
