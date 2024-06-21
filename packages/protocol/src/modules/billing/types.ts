import { BalanceLevel } from 'multirpc-sdk';

export enum EChargingModel {
  Free = 'FREE',
  PAYG = 'PAY_AS_YOU_GO',
  Package = 'PACKAGE',
  Deal = 'DEAL',
}

export interface IPackageBalance {
  balanceUsd: number;
  balanceInRequests: number;
}

export interface IPackageChargingModelData {
  balance: IPackageBalance;
  expires: number;
  isExpired: boolean;
  progressLabel: string;
  progressLabelData: {
    usedCount: number;
    wholeAmountCount: number;
    usedPercent: number;
  };
  progressValue: number;
  type: EChargingModel.Package;
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
