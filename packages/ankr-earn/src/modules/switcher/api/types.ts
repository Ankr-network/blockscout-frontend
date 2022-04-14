import BigNumber from 'bignumber.js';

import { EthSDK } from 'modules/api/EthSDK';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';

import { AvailableSwitchNetwork } from '../const';

export interface ISwitcherSDKArgs {
  binanceSDK: BinanceSDK;
  ethSDK: EthSDK;
}

export interface ISwitcherCommonDataArgs {
  chainId: AvailableSwitchNetwork;
}

export interface ISwitcherApproveArgs {
  chainId: AvailableSwitchNetwork;
  amount?: BigNumber;
}

export interface ISwitcherCommonData {
  acBalance: BigNumber;
  abBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}
