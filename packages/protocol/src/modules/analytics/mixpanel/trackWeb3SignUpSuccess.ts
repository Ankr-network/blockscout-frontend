import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface Web3SignUpSuccessTrackingParams {
  address?: string;
  hasPremium: boolean;
  walletName: string;
}

const event = MixpanelEvent.SIGN_UP_SUCCEEDED;

export const trackWeb3SignUpSuccess = ({
  address: wallet_public_address,
  hasPremium: billing,
  walletName: wallet_type,
}: Web3SignUpSuccessTrackingParams) =>
  track({
    event,
    properties: {
      billing,
      wallet_public_address,
      wallet_type,
      web3_connect: true,
    },
  });
