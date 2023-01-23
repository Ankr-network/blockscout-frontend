import { trackAddEmail as trackAddEmailUtil } from './utils/trackAddEmail';

export interface AddEmailTrackingParams {
  address?: string;
  email: string;
  hasPremium?: boolean;
  walletName?: string;
}

export const trackAddEmail = ({
  address: wallet_public_address,
  email: email_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: AddEmailTrackingParams) =>
  trackAddEmailUtil({
    add_your_email: true,
    email_address,
    billing,
    wallet_type,
    wallet_public_address,
  });
