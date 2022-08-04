import { IPaymentHistoryEntity } from 'multirpc-sdk';

export const getLastEntity = (entities: IPaymentHistoryEntity[] = []) =>
  entities.slice(-1)[0];
