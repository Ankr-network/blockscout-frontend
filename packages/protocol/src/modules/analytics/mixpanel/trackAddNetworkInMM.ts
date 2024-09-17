import { ChainID } from '@ankr.com/chains-list';

import { AddNetworkInMMEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface AddNetworkInMMTrackingParams {
  address?: string;
  email?: string;
  chainID: ChainID;
  hasOauthLogin?: boolean;
  hasPremium?: boolean;
  hasWeb3Connection?: boolean;
  isLoggedIn: boolean;
  walletName?: string;
}

const event = MixpanelEvent.ADD_NETWORK_IN_MM;

export const trackAddNetworkInMM = ({
  address: wallet_public_address,
  chainID: network,
  email: google_account,
  hasOauthLogin: web2_connect,
  hasPremium: billing = false,
  hasWeb3Connection: web3_connect,
  isLoggedIn: is_logged_in,
  walletName: wallet_type,
}: AddNetworkInMMTrackingParams) =>
  track<AddNetworkInMMEventProps>({
    event,
    properties: {
      billing,
      google_account,
      is_logged_in,
      network,
      wallet_public_address,
      wallet_type,
      web2_connect,
      web3_connect,
    },
  });
