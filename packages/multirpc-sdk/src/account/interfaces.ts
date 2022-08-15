import { EmailConfirmationStatus } from '../common';
import {
  IAggregatedPaymentHistoryRequest,
  IAggregatedPaymentHistoryResponse,
  IBalance,
  IDailyChargingParams,
  IDailyChargingResponse,
  IEmailResponse,
  IGetActiveEmailBindingResponse,
  INotificationsSettings,
  IPaymentHistoryRequest,
  IPaymentHistoryResponse,
  IWithdrawalStatusResponse,
  PrivateStats,
  PrivateStatsInterval,
} from './types';

export interface IAccountGateway {
  addToken(token: string): void;

  removeToken(): void;

  getAnkrBalance(): Promise<IBalance>;

  getDailyCharging(
    params: IDailyChargingParams,
  ): Promise<IDailyChargingResponse>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryResponse>;

  getAggregatedPaymentHistory(
    params: IAggregatedPaymentHistoryRequest,
  ): Promise<IAggregatedPaymentHistoryResponse>;

  getBalanceEndTime(blockchains?: string[]): Promise<number>;

  getPrivateStats(intervalType: PrivateStatsInterval): Promise<PrivateStats>;

  getWithdrawalStatus(
    transactionHash: string,
  ): Promise<IWithdrawalStatusResponse>;

  getEmailBindingStatuses(
    filters?: EmailConfirmationStatus,
  ): Promise<IEmailResponse[]>;

  getActiveEmailBinding(): Promise<IGetActiveEmailBindingResponse>;

  addNewEmailBinding(email: string): Promise<IEmailResponse>;

  editEmailBinding(email: string): Promise<IEmailResponse>;

  confirmEmailBinding(email: string, code: string): Promise<IEmailResponse>;

  resendConfirmationCode(email: string): Promise<string>;

  editNotificationSettings(
    data: INotificationsSettings,
  ): Promise<INotificationsSettings>;

  getNotificationSettings(): Promise<INotificationsSettings>;
}
