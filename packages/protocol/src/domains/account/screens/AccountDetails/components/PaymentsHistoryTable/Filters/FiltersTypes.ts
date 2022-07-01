import { IPaymentHistoryEntityType } from 'multirpc-sdk';

export type ITimeType = 'WEEK' | 'MONTH' | 'YEAR';

export interface IFiltersProps {
  onFetchPaymentHistory: (
    from?: number,
    to?: number,
    types?: IPaymentHistoryEntityType[],
  ) => void;
}

export type IPaymentEntityType = IPaymentHistoryEntityType | 'ALL';
