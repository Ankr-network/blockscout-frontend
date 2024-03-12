import {
  AggregatedPaymentHistoryTimeGroup,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryResponse,
  IApiUserGroupParams,
  IMyBundlesPaymentsResponse,
  BundlePaymentPlan,
  IBundleEntity,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { IPaymentHistoryTableEntity, PaymentType } from 'domains/account/types';

import { getDeductionsTypes } from './getDeductionsTypes';
import { parseTypes } from './parseTypes';
import { mapTableHistoryItems } from './mapTableHistoryItems';

export interface FetchPaymentHistoryParams extends IApiUserGroupParams {
  deductionsCursor: number;
  from: number;
  to: number;
  transactionsCursor: number;
  myBundlesPaymentsCursor: number;
  types: PaymentType[];
}

export interface FetchedPaymentHistory {
  deductions: IPaymentHistoryTableEntity[];
  deductionsCursor: number;
  transactions: IPaymentHistoryTableEntity[];
  transactionsCursor: number;
  myBundlesPayments: IPaymentHistoryTableEntity[];
  myBundlesPaymentsCursor: number;
}

type Requests = [
  Promise<IPaymentHistoryResponse>,
  Promise<IAggregatedPaymentHistoryResponse>,
  Promise<IMyBundlesPaymentsResponse>,
  Promise<BundlePaymentPlan[]>,
];

const DEFAULT_LIMIT = 15;

const defaultResponse = {
  transactions: [],
  cursor: '-1',
};

const defaultRequest = (async () => defaultResponse)();

const defaultMyBundlesPaymentsResponse = {
  bundles: [],
  cursor: '-1',
};

const defaultMyBundlesPaymentsRequest = (async () =>
  defaultMyBundlesPaymentsResponse)();

export const fetchPaymentHistory = async ({
  deductionsCursor,
  from,
  to,
  transactionsCursor,
  myBundlesPaymentsCursor,
  types,
  group,
}: FetchPaymentHistoryParams): Promise<FetchedPaymentHistory> => {
  const service = MultiService.getService();

  const { dealOnly, deductionsOnly, depositOnly, withDeductions } =
    parseTypes(types);

  const requests: Requests = [
    transactionsCursor >= 0 && !deductionsOnly && !dealOnly
      ? service.getAccountingGateway().getPaymentHistory({
          cursor: transactionsCursor,
          from,
          limit: DEFAULT_LIMIT,
          order_by: 'timestamp',
          order: 'desc',
          to,
          type: getDeductionsTypes(types),
          group,
        })
      : defaultRequest,
    deductionsCursor >= 0 && withDeductions && !dealOnly && !depositOnly
      ? service.getAccountingGateway().getAggregatedPaymentHistory({
          cursor: deductionsCursor,
          from,
          limit: DEFAULT_LIMIT,
          time_group: AggregatedPaymentHistoryTimeGroup.DAY,
          to,
          types: ['TRANSACTION_TYPE_DEDUCTION'],
          group,
        })
      : defaultRequest,
    myBundlesPaymentsCursor >= 0 && !deductionsOnly && !depositOnly
      ? service.getAccountingGateway().getMyBundlesPaymentsHistory({
          cursor: myBundlesPaymentsCursor,
          from,
          limit: DEFAULT_LIMIT,
          to,
          group,
        })
      : defaultMyBundlesPaymentsRequest,
    service.getAccountingGateway().getBundlePaymentPlans(),
  ];

  const [
    { transactions = [], ...transactionsResponse },
    { transactions: deductions = [], ...deductionsResponse },
    { bundles: myBundlesPayments = [], cursor },
    bundles,
  ] = await Promise.all(requests);

  const mapMyBundlesPayments = (
    payment: IBundleEntity,
  ): IPaymentHistoryTableEntity => {
    const bundlePriceId = payment.bundle.price_id;
    const priceData = bundles.find(bundle => bundle.price.id === bundlePriceId);

    return {
      timestamp: payment.expires_at.toString(),
      type: 'TRANSACTION_TYPE_DEAL_DEPOSIT',
      amountUsd: priceData?.price.amount ?? '',
      amountAnkr: '',
      amount: '0',
      creditAnkrAmount: '',
      creditUsdAmount:
        priceData?.bundle.limits
          .find(limit => limit.limit)
          ?.limit?.toString() ?? '',
      creditVoucherAmount: '',
      txHash: undefined,
    };
  };

  return {
    deductions: deductions.map(mapTableHistoryItems),
    deductionsCursor: Number(deductionsResponse.cursor),
    transactions: transactions.map(mapTableHistoryItems),
    transactionsCursor: Number(transactionsResponse.cursor),
    myBundlesPayments: myBundlesPayments.map(mapMyBundlesPayments),
    myBundlesPaymentsCursor: Number(cursor),
  };
};
