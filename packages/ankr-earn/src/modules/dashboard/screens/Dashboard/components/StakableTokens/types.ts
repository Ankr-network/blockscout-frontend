import BigNumber from 'bignumber.js';
import { INetwork } from 'modules/auth/components/GuardRoute/useNetworks';

export interface IUseStakableToken {
  balance: BigNumber;
  isShowed: boolean;
  icon: any;
  networks: INetwork[];
  token: string;
  href: string;
  apy: number;
  isStakeLoading: boolean;
  isLoading: boolean;
}
