import { ReactNode } from 'react';

import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from 'uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { ADOTBIcon } from 'uiKit/Icons/ADOTBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

import { TDeFiNetwork } from '../api/defi';

export const TOKEN_ASSET_ICON_MAP: Record<string, ReactNode> = {
  ANKR: <AnkrIcon />,
  ETH: <EthIcon />,
  wETH: <EthIcon />,
  aETHc: <AETHCIcon />,
  aETHb: <AETHBIcon />,
  BNB: <BNBIcon />,
  wBNB: <BNBIcon />,
  aBNBb: <ABNBBIcon />,
  aBNBc: <ABNBCIcon />,
  MATIC: <MaticIcon />,
  wMATIC: <MaticIcon />,
  aMATICb: <AMATICBIcon />,
  aMATICc: <AMATICCIcon />,
  AVAX: <AvaxIcon />,
  wAVAX: <AvaxIcon />,
  aAVAXb: <AAvaxBIcon />,
  aAVAXc: <AAvaxCIcon />,
  FTM: <FantomIcon />,
  wFTM: <FantomIcon />,
  aFTMb: <AFTMBIcon />,
  aDOTb: <ADOTBIcon />,
  aKSMb: <KsmIcon />,
};

export const TOKEN_NETWORK_ICON_MAP: Record<TDeFiNetwork, ReactNode> = {
  ethereum: <EthIcon />,
  bnb: <BNBIcon />,
  polygon: <PolygonIcon />,
  avalanche: <AvaxIcon />,
  fantom: <FantomIcon />,
};
