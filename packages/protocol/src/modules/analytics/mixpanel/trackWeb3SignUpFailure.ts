import { MixpanelEvent } from './const';
import { Web3SignUpEventProps } from './types';
import { track } from './utils/track';

export interface Web3SignUpFailureTrackingParams {
  walletName: string;
}

const event = MixpanelEvent.SIGN_UP_FAILIED;

export const trackWeb3SignUpFailure = ({
  walletName: wallet_type,
}: Web3SignUpFailureTrackingParams) =>
  track<Web3SignUpEventProps>({
    event,
    properties: { billing: false, wallet_type, web3_connect: true },
  });
