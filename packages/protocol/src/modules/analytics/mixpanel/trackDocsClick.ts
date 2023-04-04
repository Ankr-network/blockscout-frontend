import { DocsClickEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface DocsClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.READ_DOCS;

export const trackDocsClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: DocsClickTrackingParams) =>
  track<DocsClickEventProps>({
    event,
    properties: {
      billing,
      docs_button: true,
      wallet_public_address,
      wallet_type,
    },
  });
