export interface IPaymentHistoryEntity {
  id: string;
  date: string;
  paymentType: string;
  direction: 'income' | 'outbound';
  amountUsd: string;
  amountAnkr: string;
}

export interface IPaymentHistoryRequest {
  page: number;
  pageSize?: number;
  orderBy: keyof IPaymentHistoryEntity;
  order: 'asc' | 'desc';
}

export interface IPaymentHistoryReponse {
  data: IPaymentHistoryEntity[];
  page: number;
  totalPages: number;
}

export interface IBalance {
  balance: string;
}