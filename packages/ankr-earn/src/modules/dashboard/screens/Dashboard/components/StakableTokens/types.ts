import BigNumber from 'bignumber.js';

import { INetwork } from 'modules/auth/common/components/GuardRoute/useNetworks';
import { Token } from 'modules/common/types/token';

export interface IUseStakableToken {
  balance: BigNumber;
  isShowed: boolean;
  icon: JSX.Element;
  networks: INetwork[];
  token: Token;
  href: string;
  apy: number;
  isStakeLoading: boolean;
  isLoading: boolean;
}
