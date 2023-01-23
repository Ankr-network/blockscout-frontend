import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';
import { trackWeb3Connect } from './utils/trackWeb3Connect';

export interface Web3ConnectFailureTrackingParams {
  walletName: string;
}

export const trackWeb3ConnectFailure = ({
  walletName: wallet_type,
}: Web3ConnectFailureTrackingParams) => {
  trackWeb3Connect({
    billing: false,
    user_connected: false,
    wallet_type,
  });

  trackConnectWalletFlow({ sign_up: false });
};
