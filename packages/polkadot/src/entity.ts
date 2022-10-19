import BigNumber from 'bignumber.js';

import { Address } from '@ankr.com/provider-core';

export type TEthereumAddress = Address;
export type TPolkadotAddress = string;

export type TNetworkType = 'DOT' | 'KSM' | 'WND' | 'ROC';

export type TClaimMethod = 'ERC20' | 'PARACHAIN';

export type TCrowdloanStatus =
  | 'CREATED' // crowdloan is created, no contributions allowed and no claims
  | 'ONGOING' // contributions allowed, claims not allowed
  | 'PAUSED' // contributions and claims are not allowed
  | 'SUCCESSFULLY_RETIRED' // [for future needs, possibly internal]
  | 'SUCCESSFULLY_REFUNDING' // [for future needs], after 2 years user can claim available (proof of burn)
  | 'SUCCEEDED' // contributions is not allowed, claim is available
  | 'FAILED_RETIRED' // auction is failed, we're returning money, nothing is available
  | 'FAILED_REFUNDING'; // refunding, we're distributing, claim (proof of key) is available

export enum EActionStatuses {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Reverted = 'REVERTED',
  Unknown = 'UNKNOWN',
}

export enum EActionTypes {
  Burn = 'BURN',
  ClaimBond = 'CLAIM_BOND',
  ClaimFutures = 'CLAIM_FUTURES',
  Deposit = 'DEPOSIT',
  Exit = 'EXIT',
  Undefined = 'UNDEFINED',
}

export enum EClaimStatuses {
  Active = 'ACTIVE',
  Claimed = 'CLAIMED',
  Expired = 'EXPIRED',
}

export enum EEnvTypes {
  Develop = 'develop',
  Production = 'prod',
  Stage = 'staging',
}

export interface ICrowdloanType {
  airdropPool: string;
  airdropRate: BigNumber;
  airdropScheme: string;
  alreadyContributed: BigNumber;
  bondTokenContract: string;
  bondTokenName: string;
  bondTokenSymbol: string;
  currentBid: BigNumber;
  currentRate: BigNumber;
  endLease: number;
  endTime: number;
  fallbackRate: BigNumber;
  loanId: number;
  parachainUrl: string;
  projectDescription: string;
  projectLogo: string;
  projectName: string;
  projectUrl: string;
  rewardPool: string;
  rewardRate: BigNumber;
  rewardRateTicker: string;
  rewardScheme: string;
  rewardTokenContract: string;
  rewardTokenName: string;
  rewardTokenSymbol: string;
  stakeFiContributed: BigNumber;
  startLease: number;
  startTime: number;
  status: TCrowdloanStatus;
  totalRaiseTarget: BigNumber;
}

export interface IClaimItem {
  address: TPolkadotAddress;
  createdTimestamp: number;
  data: {
    amount: string;
    claimBeforeBlock: number;
    claimId: string;
    ethAddress: TEthereumAddress;
    nativeAmount: string;
    network: number;
    signature: string;
  };
  expiresTimestamp: number;
  loanId: number;
  status: EClaimStatuses;
  tokenAddress: TEthereumAddress;
}

export interface IHistoryItem {
  address: TPolkadotAddress;
  amount: string; // number;
  id: string;
  status: EActionStatuses;
  timestamp: number;
  txId: string;
  type: EActionTypes;
}

export interface IRewardClaim {
  claim: {
    address: TPolkadotAddress;
    createdTimestamp: number;
    data: {
      amount: BigNumber;
      claimBeforeBlock: number;
      claimId: string;
      issueBlock: number;
      network: number;
      signature: string;
    };
    expiresTimestamp: number;
    status: EClaimStatuses;
  };
  tokenAddress: TEthereumAddress;
}
