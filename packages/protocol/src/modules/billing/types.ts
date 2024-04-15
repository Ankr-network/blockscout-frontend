import { BalanceLevel, SubscriptionPrice } from 'multirpc-sdk';

export enum EChargingModel {
  Free = 'FREE',
  PAYG = 'PAY_AS_YOU_GO',
  Package = 'PACKAGE',
  Deal = 'DEAL',
}

export enum ECryptoDepositStep {
  Approval = 1,
  Deposit,
}

export enum ECryptoDepositStepStatus {
  Complete = 1,
  Confirmation,
  Error,
  Pending,
}

export enum ECurrency {
  ANKR = 'ANKR',
  USD = 'USD',
}

export enum ENetwork {
  ETH = 'ETH',
}

export enum EPaymentType {
  OneTime = 'one-time',
  Recurring = 'recurring',
  Deal = 'deal',
}

export interface IAmount {
  currency: ECurrency;
  id: SubscriptionPrice['id'];
  value: number;
}

export interface IFeeDetails {
  feeCrypto: number;
  feeUSD: number;
  txURL?: string;
}

export interface IPackageBalance {
  balanceUsd: number;
  balanceInRequests: number;
}

export interface IPackageChargingModelData {
  type: EChargingModel.Package;
  balance: IPackageBalance;
  isExpired: boolean;
  progressValue: number;
  progressLabel: string;
  progressLabelData: {
    usedCount: number;
    wholeAmountCount: number;
    usedPercent: number;
  };
}

export interface IDealBalance extends IPackageBalance {
  balanceApiCredits: number;
}

export interface IDealChargingModelData {
  type: EChargingModel.Deal;
  balance: IDealBalance;
  progressData: {
    usedCount: number;
    wholeAmountCount: number;
    usedPercent: number;
  };
  progressValue: number;
  progressLabel: string;
  maxLabel: string;
  expires: number; // format: unix seconds
}

export interface IPAYGBalance extends IDealBalance {
  balanceLevel: BalanceLevel;
  balanceAnkr: number;
  balanceTotal: number;
  balanceVoucher: number;
  balanceWithoutVouchers: number;
}
export interface IPAYGChargingModelData {
  type: EChargingModel.PAYG;
  balance: IPAYGBalance;
}

export interface IFreeChargingModelData {
  type: EChargingModel.Free;
  balance: IPAYGBalance;
}

export type IChargingModelData =
  | IFreeChargingModelData
  | IPackageChargingModelData
  | IDealChargingModelData
  | IPAYGChargingModelData;
