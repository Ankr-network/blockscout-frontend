import { MixpanelEvent } from './const';
import { SettingsClickEventProps } from './types';
import { track } from './utils/track';

export interface SettingsClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.ENTER_SETTINGS;

export const trackSettingsClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: SettingsClickTrackingParams) =>
  track<SettingsClickEventProps>({
    event,
    properties: {
      billing,
      settings_button: true,
      wallet_public_address,
      wallet_type,
    },
  });
