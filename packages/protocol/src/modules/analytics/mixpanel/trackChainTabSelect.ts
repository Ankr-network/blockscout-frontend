import { SectionID } from 'domains/chains/screens/ChainItem/components/ChainItemSections/types';
import { trackChainTabSelect as trackChainTabSelectUtil } from './utils/trackChainTabSelect';

export interface ChainTabSelectTrackingParams {
  address?: string;
  hasPremium?: boolean;
  tabName: SectionID;
  walletName?: string;
}

export const trackChainTabSelect = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  tabName: tab_name,
  walletName: wallet_type,
}: ChainTabSelectTrackingParams) =>
  trackChainTabSelectUtil({
    billing,
    tab_name,
    wallet_public_address,
    wallet_type,
  });
