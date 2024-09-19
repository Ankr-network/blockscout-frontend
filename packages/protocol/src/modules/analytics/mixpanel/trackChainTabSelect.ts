import { SectionID } from 'domains/chains/screens/ChainPage/components/ChainItemSections/types';

import { ChainTabSelectEventProps } from './types';
import { MixpanelEvent } from './const';
import { track } from './utils/track';

export interface ChainTabSelectTrackingParams {
  address?: string;
  hasPremium?: boolean;
  tabName: SectionID;
  walletName?: string;
}

const event = MixpanelEvent.SELECT_CHAIN_TAB;

export const trackChainTabSelect = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  tabName: tab_name,
  walletName: wallet_type,
}: ChainTabSelectTrackingParams) =>
  track<ChainTabSelectEventProps>({
    event,
    properties: {
      billing,
      tab_name,
      wallet_public_address,
      wallet_type,
    },
  });
