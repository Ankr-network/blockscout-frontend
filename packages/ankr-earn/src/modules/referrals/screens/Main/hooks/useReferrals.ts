import BigNumber from 'bignumber.js';

import { Address } from '@ankr.com/provider';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

interface IUseReferralsData {
  registrationDate: Date;
  address: Address;
  stakedTokens: Token;
  stakedAmount: BigNumber;
  stakedAmountUsd: BigNumber;
  myRewards: BigNumber;
  myRewardsUsd: BigNumber;
}

interface IUseReferrals {
  isLoading: boolean;
  data: IUseReferralsData[] | null;
}

const DEMO_DATA: IUseReferralsData[] = [
  {
    registrationDate: new Date(11, 11, 2022),
    address: '0x6231612398472135hj43h295adsajdasasdasd8974123nk3',
    stakedTokens: Token.BNB,
    stakedAmount: ZERO.plus(1),
    stakedAmountUsd: ZERO.plus(11),
    myRewards: ZERO.plus(2),
    myRewardsUsd: ZERO.plus(22),
  },
];

export const useReferrals = (): IUseReferrals => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
