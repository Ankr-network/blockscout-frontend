import { trackReadDocs } from './utils/trackReadDocs';

export interface DocsClickTrackingParams {
  address?: string;
  hasPremium?: boolean;
  walletName?: string;
}

export const trackDocsClick = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  walletName: wallet_type,
}: DocsClickTrackingParams) =>
  trackReadDocs({
    billing,
    docs_button: true,
    wallet_public_address,
    wallet_type,
  });
