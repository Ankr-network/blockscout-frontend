import {
  EmailConfirmationStatus,
  IAggregatedPaymentHistoryReponse,
  IAggregatedPaymentHistoryRequest,
  IBalance,
  IDailyChargingParams,
  IDailyChargingReponse,
  IEmailResponse,
  IGetActiveEmailBindingResponse,
  INotificationsSettings,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IRequestsRequest,
  IRequestsResponse,
  IWithdrawalStatusResponse,
  PrivateStats,
  PrivateStatsInterval,
} from './types';

export interface IAccountGateway {
  addToken(token: string): void;

  removeToken(): void;

  getAnkrBalance(): Promise<IBalance>;

  getRequests(params: IRequestsRequest): Promise<IRequestsResponse>;

  getDailyCharging(
    params: IDailyChargingParams,
  ): Promise<IDailyChargingReponse>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse>;

  getAggregatedPaymentHistory(
    params: IAggregatedPaymentHistoryRequest,
  ): Promise<IAggregatedPaymentHistoryReponse>;

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
