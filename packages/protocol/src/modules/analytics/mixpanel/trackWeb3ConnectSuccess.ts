import { IJwtToken } from 'multirpc-sdk';

import { trackConnectWalletFlow } from './utils/trackConnectWalletFlow';
import { trackWeb3Connect } from './utils/trackWeb3Connect';

export interface Web3ConnectSuccessTrackingParams {
  address?: string;
  credentials?: IJwtToken;
  walletName: string;
}

export const trackWeb3ConnectSuccess = ({
  address: wallet_public_address,
  credentials,
  walletName: wallet_type,
}: Web3ConnectSuccessTrackingParams) => {
  trackWeb3Connect({
    billing: Boolean(credentials),
    user_connected: true,
    wallet_public_address,
    wallet_type,
  });

  trackConnectWalletFlow({ sign_up: true });
};
