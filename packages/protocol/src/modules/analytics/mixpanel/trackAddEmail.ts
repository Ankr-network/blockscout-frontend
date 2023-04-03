import { AddEmailEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface AddEmailTrackingParams {
  address?: string;
  email: string;
  hasPremium?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.ADD_EMAIL;

export const trackAddEmail = ({
  address: wallet_public_address,
  email: email_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: AddEmailTrackingParams) =>
  track<AddEmailEventProps>({
    event,
    properties: {
      add_your_email: true,
      email_address,
      billing,
      wallet_type,
      wallet_public_address,
    },
  });
