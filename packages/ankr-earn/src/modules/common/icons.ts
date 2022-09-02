import { ForwardRefExoticComponent, MemoExoticComponent } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from 'uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { ADOTBIcon } from 'uiKit/Icons/ADOTBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AFTMCIcon } from 'uiKit/Icons/AFTMCIcon';
import { AKSMBIcon } from 'uiKit/Icons/AKSMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';
import { ISvgIconProps } from 'uiKit/Icons/withSvgIcon';
import { xDAIIcon } from 'uiKit/Icons/xDAIIcon';

import { Token } from './types/token';

export type TIcon = MemoExoticComponent<
  ForwardRefExoticComponent<ISvgIconProps>
>;

export type TIconMap = Record<Token, TIcon>;

export type TNetworkIconMap = {
  [chainID in EEthereumNetworkId]?: TIcon;
};

export const iconByTokenMap: TIconMap = {
  [Token.aAVAXb]: AAvaxBIcon,
  [Token.aAVAXc]: AAvaxCIcon,
  [Token.aBNBb]: ABNBBIcon,
  [Token.aBNBc]: ABNBCIcon,
  [Token.aDOTb]: ADOTBIcon,
  [Token.aETHb]: AETHBIcon,
  [Token.aETHc]: AETHCIcon,
  [Token.aETH]: AETHCIcon,
  [Token.aFTMb]: AFTMBIcon,
  [Token.aFTMc]: AFTMCIcon,
  [Token.aKSMb]: AKSMBIcon,
  [Token.aMATICb]: AMATICBIcon,
  [Token.aMATICc]: AMATICCIcon,
  [Token.aWNDb]: ADOTBIcon,
  [Token.AVAX]: AvaxIcon,
  [Token.MATIC]: MaticIcon,
  [Token.DOT]: DotIcon,
  [Token.FTM]: FantomIcon,
  [Token.KSM]: KsmIcon,
  [Token.WND]: DotIcon,
  [Token.ETH]: EthIcon,
  [Token.BNB]: BNBIcon,
  [Token.ANKR]: AnkrIcon,
  [Token.mGNO]: MGNOIcon,
  [Token.xDAI]: xDAIIcon,
};

export const iconByNetworkMap: TNetworkIconMap = {
  1: EthIcon,
  5: EthIcon,
  56: BNBIcon,
  97: BNBIcon,
  43114: AvaxIcon,
  43113: AvaxIcon,
  137: MaticIcon,
  250: FantomIcon,
  4002: FantomIcon,
  80001: MaticIcon,
};
