import { IPaymentHistoryTableEntity } from 'domains/account/types';

export const getLastEntity = (entities: IPaymentHistoryTableEntity[] = []) =>
  entities.slice(-1)[0];
