import {
  BalanceLevel,
  EBlockchain,
  SubscriptionPrice,
  Web3Address,
} from 'multirpc-sdk';

export interface IPackageBalance {
  balanceUsd: number;
  balanceInRequests: number;
}

interface IProgressData {
  usedCount: number;
  wholeAmountCount: number;
  usedPercent: number;
}

export interface IPackageChargingModelData {
  balance: IPackageBalance;
  expires: number;
  isExpired: boolean;
  progressLabel: string;
  progressLabelData: IProgressData;
  progressValue: number;
  type: EChargingModel.Package;
}

export interface IDealBalance extends IPackageBalance {
  balanceApiCredits: number;
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

export interface IPAYGBalance extends IDealBalance {
  balanceLevel: BalanceLevel;
  balanceAnkr: number;
  balanceTotal: number;
  balanceVoucher: number;
  balanceWithoutVouchers: number;
}

export interface IDealChargingModelData {
  balance: IDealBalance;
  expires: number; // format: unix seconds
  isPromo?: boolean;
  maxLabel: string;
  price: number;
  progressData: IProgressData;
  progressLabel: string;
  progressValue: number;
  type: EChargingModel.Deal | EChargingModel.Promo;
}

export enum EChargingModel {
  Free = 'FREE',
  PAYG = 'PAY_AS_YOU_GO',
  Package = 'PACKAGE',
  Deal = 'DEAL',
  Promo = 'PROMO',
}

export enum ECryptoDepositStep {
  Allowance = 1,
  Deposit,
}

export enum ECryptoDepositStepStatus {
  Complete = 1,
  Confirming,
  Error,
  Initializing,
  Pending,
}

export enum ECurrency {
  ANKR = 'ANKR',
  USD = 'USD',
  USDT = 'USDT',
  USDC = 'USDC',
}

export enum EPaymentType {
  OneTime = 'one-time',
  Recurring = 'recurring',
  Deal = 'deal',
}

export const DEAL_UPGRADE_PAYMENT_TYPE = 'deal-upgrade';
export type TDealUpgradePaymentType = typeof DEAL_UPGRADE_PAYMENT_TYPE;

export type TPaymentTypeExtended = EPaymentType | TDealUpgradePaymentType;

export enum EPaymentTypeExtension {
  DealUpgrade = 'deal-upgrade',
}

export type TStablecoinCurrency = ECurrency.USDC | ECurrency.USDT;

export type TCryptoCurrency = TStablecoinCurrency | ECurrency.ANKR;

export interface IAmount {
  currency: ECurrency;
  id: SubscriptionPrice['id'];
  value: number;
}

export interface IFeeDetails {
  feeCrypto: number;
  feeUSD: number;
}

export interface INetwork {
  blockchain: EBlockchain;
}

export interface ICryptoTransaction {
  accountAddress: Web3Address; // auth address or group address
  allowanceAmount?: number;
  allowanceError?: string;
  allowanceFeeDetailsEstimated?: IFeeDetails;
  allowanceFeeDetailsPaid?: IFeeDetails;
  allowanceTxHash?: string;
  amount: number;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetailsEstimated?: IFeeDetails;
  depositFeeDetailsPaid?: IFeeDetails;
  depositTxHash?: string;
  from: Web3Address;
  hadAllowance: boolean;
  id: string;
  isAllowanceConfirming?: boolean;
  isApproved: boolean;
  isApproving?: boolean;
  isConfirmed?: boolean;
  isDepositConfirming?: boolean;
  isDepositing?: boolean;
  network: EBlockchain;
  to: Web3Address; // PAYG contract address
}

export interface IFiatTransaction {
  amount: number;
  txOrigin: string;
}

export interface IPaymentsSlice {
  cryptoTransactions: ICryptoTransaction[];
  fiatTransaction?: IFiatTransaction;
}

export interface ICreateCryptoTxPayload
  extends Omit<ICryptoTransaction, 'isApproved'> {}

export interface ICreateFiatTxPayload extends IFiatTransaction {}

export interface IUpdateCryptoTxPayload {
  id: string;
}

type TCryptoTxField<
  Field extends keyof ICryptoTransaction,
  Partial = false,
> = Partial extends true
  ? Pick<ICryptoTransaction, Field>
  : Pick<Required<ICryptoTransaction>, Field>;

export interface ISetAllowanceAmountPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'allowanceAmount'> {}

export interface ISetAllowanceErrorPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'allowanceError', true> {}

export interface ISetAllowanceFeeDetailsPaidPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'allowanceFeeDetailsPaid'> {}

export interface ISetAllowanceFeeDetailsEstimatedPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'allowanceFeeDetailsEstimated'> {}

export interface ISetAllowanceTxHashPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'allowanceTxHash'> {}

export interface ISetAmountPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'amount'> {}

export interface ISetCurrencyPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'currency'> {}

export interface ISetDepositErrorPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'depositError', true> {}

export interface ISetDepositFeeDetailsPaidPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'depositFeeDetailsPaid'> {}

export interface ISetDepositFeeDetailsEstimatedPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'depositFeeDetailsEstimated'> {}

export interface ISetDepositTxHashPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'depositTxHash'> {}

export interface ISetFromAddressPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'from'> {}

export interface ISetIsAllowanceConfirmingPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isAllowanceConfirming'> {}

export interface ISetIsApprovedPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isApproved'> {}

export interface ISetIsApprovingPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isApproving'> {}

export interface ISetIsConfirmedPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isConfirmed'> {}

export interface ISetIsDepositConfirmingPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isDepositConfirming'> {}

export interface ISetIsDepositingPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'isDepositing'> {}

export interface ISetNetworkPayload
  extends IUpdateCryptoTxPayload,
    TCryptoTxField<'network'> {}
