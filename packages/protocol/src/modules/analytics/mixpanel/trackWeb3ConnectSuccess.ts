import { IJwtToken } from 'multirpc-sdk';

import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';

export interface Web3ConnectSuccessTrackingParams {
  address?: string;
  credentials?: IJwtToken;
  walletName: string;
}

export const trackWeb3ConnectSuccess = ({
  address: wallet_public_address,
  credentials,
  walletName: wallet_type,
}: Web3ConnectSuccessTrackingParams) =>
  trackConnectWalletFlow({
    billing: Boolean(credentials),
    sign_up: true,
    wallet_public_address,
    wallet_type,
    web3_connect: true,
  });
