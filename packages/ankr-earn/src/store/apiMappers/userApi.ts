import BigNumber from 'bignumber.js';
import { Blockchain, Provider } from 'modules/common/types';

export interface IUserInfo {
  networkName: string;
  address: string;
  blockchainType: Blockchain;
  walletType: Provider;
  walletName?: string;
  walletIcon?: string;
  ethereumBalance: BigNumber;
  ankrBalance: BigNumber;
  dotBalance?: BigNumber;
  aEthBalance: BigNumber;
  fEthBalance: BigNumber;
  nativeBalance: BigNumber;
  bnbBalance?: BigNumber;
}

export interface IStakingFeeInfo {
  stakingFeeRate?: BigNumber;
}
