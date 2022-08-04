import BigNumber from 'bignumber.js';

export enum EFieldsNames {
  amount = 'amount',
  provider = 'provider',
  yourRewards = 'yourRewards',
  restakeRewards = 'restakeRewards',
  claimRewards = 'claimRewards',
}

export interface IAnkrStakeSubmitPayload {
  amount: string;
  provider: string;
  yourRewards: string;
  restakeRewards: string;
}

export interface IAnkrFormState {
  amount?: BigNumber;
}
