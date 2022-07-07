import { ReactText } from 'react';

export enum AvailableBridgeTokens {
  aMATICb = 'aMATICb',
  aMATICc = 'aMATICc',
  aETHb = 'aETHb',
  aETHc = 'aETHc',
}

export interface IBridgeBlockchainPanelItem {
  label: string;
  icon: JSX.Element;
  value: ReactText;
  disabled?: boolean;
}
