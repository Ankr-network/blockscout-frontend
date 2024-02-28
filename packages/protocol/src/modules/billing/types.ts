import { BalanceLevel } from 'multirpc-sdk';

export enum EChargingModel {
  Free = 'FREE',
  PAYG = 'PAY_AS_YOU_GO',
  Package = 'PACKAGE',
  Deal = 'DEAL',
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

export interface IPackageBalance {
  balanceUsd: string;
  balanceInRequests: string;
}

export interface IPackageChargingModelData {
  type: EChargingModel.Package;
  balance: IPackageBalance;
  isExpired: boolean;
  progressValue: number;
  progressLabel: string;
}

export interface IDealBalance extends IPackageBalance {
  balanceApiCredits: string;
}

export interface IDealChargingModelData {
  type: EChargingModel.Deal;
  balance: IDealBalance;
  progressValue: number;
  progressLabel: string;
  maxLabel: string;
  expires: string;
}

export interface IPAYGBalance extends IDealBalance {
  balanceLevel: BalanceLevel;
  balanceAnkr: string;
  balanceTotal: string;
  balanceVoucher: string;
  balanceWithoutVouchers: string;
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
