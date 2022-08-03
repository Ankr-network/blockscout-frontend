import {
  AggregatedPaymentHistoryTimeGroup,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryEntity,
  IPaymentHistoryEntityType,
  IPaymentHistoryResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { parseTypes } from './parseTypes';

export interface FetchPaymentHistoryParams {
  deductionsCursor: number;
  from: number;
  to: number;
  transactionsCursor: number;
  types: IPaymentHistoryEntityType[];
}

export interface FetchedPaymentHistory {
  deductions: IPaymentHistoryEntity[];
  deductionsCursor: number;
  transactions: IPaymentHistoryEntity[];
  transactionsCursor: number;
}

type Requests = [
  Promise<IPaymentHistoryResponse>,
  Promise<IAggregatedPaymentHistoryResponse>,
];

const DEFAULT_LIMIT = 15;

const defaultResponse = {
  transactions: [],
  cursor: '-1',
};

const defaultRequest = (async () => defaultResponse)();

export const fetchPaymentHistory = async ({
  deductionsCursor,
  from,
  to,
  transactionsCursor,
  types,
}: FetchPaymentHistoryParams): Promise<FetchedPaymentHistory> => {
  const service = await MultiService.getInstance();

  const { deductionsOnly, withDeductions } = parseTypes(types);

  const requests: Requests = [
    transactionsCursor >= 0 && !deductionsOnly
      ? service.getPaymentHistory({
          cursor: transactionsCursor,
          from,
          limit: DEFAULT_LIMIT,
          order_by: 'timestamp',
          order: 'desc',
          to,
          type: types,
        })
      : defaultRequest,
    deductionsCursor >= 0 && withDeductions
      ? service.getAggregatedPaymentHistory({
          cursor: deductionsCursor,
          from,
          limit: DEFAULT_LIMIT,
          time_group: AggregatedPaymentHistoryTimeGroup.DAY,
          to,
          types: ['TRANSACTION_TYPE_DEDUCTION'],
        })
      : defaultRequest,
  ];

  const [
    { transactions = [], ...transactionsResponse },
    { transactions: deductions = [], ...deductionsResponse },
  ] = await Promise.all(requests);

  return {
    deductions,
    deductionsCursor: Number(deductionsResponse.cursor),
    transactions,
    transactionsCursor: Number(transactionsResponse.cursor),
  };
};
