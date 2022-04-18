import {
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
} from './types';

export interface IAccountGateway {
  addToken(token: string): void;

  removeToken(): void;

  getAnkrBalance(): Promise<IBalance>;

  getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse>;
}
