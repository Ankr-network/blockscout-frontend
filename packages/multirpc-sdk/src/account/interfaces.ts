import {
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IRequestsRequest,
  IRequestsResponse,
} from './types';

export interface IAccountGateway {
  addToken(token: string): void;

  removeToken(): void;

  getAnkrBalance(): Promise<IBalance>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse>;

  getRequests(params: IRequestsRequest): Promise<IRequestsResponse>;
}
