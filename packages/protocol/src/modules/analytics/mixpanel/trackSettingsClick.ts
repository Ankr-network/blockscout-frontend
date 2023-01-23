import { trackEnterSettings } from './utils/trackEnterSettings';

export interface SettingsClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

export const trackSettingsClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: SettingsClickTrackingParams) =>
  trackEnterSettings({
    billing,
    settings_button: true,
    wallet_public_address,
    wallet_type,
  });
