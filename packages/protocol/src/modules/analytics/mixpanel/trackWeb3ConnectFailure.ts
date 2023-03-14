import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export interface Web3ConnectFailureTrackingParams {
  walletName: string;
}

export const trackWeb3ConnectFailure = ({
  walletName: wallet_type,
}: Web3ConnectFailureTrackingParams) =>
  trackConnectWalletFlow({
    billing: false,
    sign_up: false,
    wallet_type,
    web3_connect: true,
  });
