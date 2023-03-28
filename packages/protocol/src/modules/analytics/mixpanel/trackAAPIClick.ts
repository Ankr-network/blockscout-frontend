import { trackAAPIClick as trackAAPIClickUtil } from './utils/trackAAPIClick';

export interface AAPIClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

export const trackAAPIClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: AAPIClickTrackingParams) =>
  trackAAPIClickUtil({
    billing,
    wallet_public_address,
    wallet_type,
  });
