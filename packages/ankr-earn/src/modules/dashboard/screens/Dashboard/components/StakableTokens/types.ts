import BigNumber from 'bignumber.js';

import { IETHNetwork } from 'modules/auth/eth/hooks/useETHNetworks';
import { Token } from 'modules/common/types/token';

export interface IUseStakableToken {
  balance: BigNumber;
  isShowed: boolean;
  icon: JSX.Element;
  networks: IETHNetwork[];
  token: Token;
  href: string;
  apy: number;
  isStakeLoading: boolean;
  isLoading: boolean;
}
