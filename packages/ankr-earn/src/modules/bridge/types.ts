import { ReactText } from 'react';

export enum AvailableBridgeTokens {
  aMATICb = 'aMATICb',
  aETHb = 'aETHb',
}

export interface IBridgeBlockchainPanelItem {
  label: string;
  icon: JSX.Element;
  value: ReactText;
  disabled?: boolean;
}
