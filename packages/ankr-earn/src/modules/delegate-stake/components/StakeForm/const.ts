import BigNumber from 'bignumber.js';

export interface IStakeSubmitPayload {
  amount: string;
  provider: string;
  yourRewards: string;
  restakeRewards: string;
}

export interface IAnkrStakeSubmitPayload {
  amount: string;
  provider: string;
}

export interface IAnkrStakeFormPayload extends Partial<IAnkrStakeSubmitPayload> {}

export interface IFormState {
  amount?: BigNumber;
}

export enum EFieldsNames {
  amount = 'amount',
  provider = 'provider',
  yourRewards = 'yourRewards',
  restakeRewards = 'restakeRewards',
  claimRewards = 'claimRewards',
}
