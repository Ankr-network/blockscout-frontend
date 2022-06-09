import BigNumber from 'bignumber.js';

import {
  INetworkItem,
  TNetworkId,
} from 'modules/auth/common/components/GuardRoute';
import { Token } from 'modules/common/types/token';

export interface IUseStakableToken<
  NetworkItem extends INetworkItem<TNetworkId>,
> {
  apy: number;
  balance: BigNumber;
  href: string;
  icon: JSX.Element;
  isLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  networks: NetworkItem[];
  token: Token;
}
