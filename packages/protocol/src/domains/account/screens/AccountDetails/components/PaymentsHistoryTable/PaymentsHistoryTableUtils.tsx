import BigNumber from 'bignumber.js';
import { IPaymentHistoryEntity, IPaymentHistoryEntityType } from 'multirpc-sdk';
import {
  createContext,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from 'react';

export const PAYMENT_HISTORY_TYPE: Record<IPaymentHistoryEntityType, string> = {
  TRANSACTION_TYPE_UNKNOWN: 'Unknown',
  TRANSACTION_TYPE_DEPOSIT: 'Deposit',
  TRANSACTION_TYPE_DEDUCTION: 'Deduction',
  TRANSACTION_TYPE_WITHDRAW: 'Withdraw',
  TRANSACTION_TYPE_BONUS: 'Bonus',
  TRANSACTION_TYPE_COMPENSATION: 'Compensation',
};

export const PAYMENT_HISTORY_PAGE_SIZE = 10;

export const PaymentHistoryDefaultParams = {
  page: 1,
  order_by: 'timestamp',
  sort: 'desc',
};

export interface UsePaymentHistoryTableUtilsParams {
  page: number;
  order_by: string;
  sort: string;
}

export interface PaymentHistoryTableUtilsContext {
  tableParams: UsePaymentHistoryTableUtilsParams;
  setTableParams: (params: Partial<UsePaymentHistoryTableUtilsParams>) => void;
  handleSort: MouseEventHandler<HTMLSpanElement>;
  handleChangePage: () => void;
}

export const usePaymentHistoryTableUtils = (
  defaultParams: UsePaymentHistoryTableUtilsParams,
  callbacks?: {
    onChangePage?: (params: UsePaymentHistoryTableUtilsParams) => void;
    onSort?: (params: UsePaymentHistoryTableUtilsParams) => void;
  },
): PaymentHistoryTableUtilsContext => {
  const [tableParams, setTableParamsBase] = useState(defaultParams);

  const setTableParams = useCallback(
    (params: Partial<UsePaymentHistoryTableUtilsParams>) => {
      setTableParamsBase({ ...tableParams, ...params });
    },
    [tableParams],
  );

  const handleSort: MouseEventHandler<HTMLSpanElement> = useCallback(
    event => {
      if (callbacks?.onSort) {
        const field = event.currentTarget.getAttribute('data-field')!;

        const sort = {
          sort: tableParams.sort === 'desc' ? 'asc' : 'desc',
          order_by: field,
        };
        setTableParams(sort);

        callbacks?.onSort({
          ...tableParams,
          ...sort,
        });
      }
    },
    [callbacks, setTableParams, tableParams],
  );

  const handleChangePage = useCallback(() => {
    if (callbacks?.onChangePage) {
      setTableParams({ page: tableParams.page + 1 });
      callbacks?.onChangePage({
        ...tableParams,
        page: tableParams.page + 1,
      });
    }
  }, [callbacks, setTableParams, tableParams]);

  return {
    tableParams,
    setTableParams,
    handleSort,
    handleChangePage,
  };
};

export const PaymentHistoryTableContext =
  createContext<PaymentHistoryTableUtilsContext>({
    tableParams: PaymentHistoryDefaultParams,
    setTableParams: () => {
      /** */
    },
    handleSort: () => {
      /** */
    },
    handleChangePage: () => {
      /** */
    },
  });

export const usePaymentHistoryContext = () => {
  return useContext(PaymentHistoryTableContext);
};

export const getPaymentHistoryItemDirection = (
  type: IPaymentHistoryEntity['type'],
): boolean | undefined => {
  if (['TRANSACTION_TYPE_UNKNOWN'].includes(type)) {
    return undefined;
  }

  return [
    'TRANSACTION_TYPE_DEPOSIT',
    'TRANSACTION_TYPE_BONUS',
    'TRANSACTION_TYPE_COMPENSATION',
  ].includes(type);
};

export const getPaymentHistoryItemSign = (direction?: boolean): string => {
  if (typeof direction === 'undefined') {
    return '';
  }
  return direction ? '+' : '-';
};

export const getPaymentHistorySortArrow = (
  sort: UsePaymentHistoryTableUtilsParams['sort'],
) => {
  return sort === 'desc' ? '↓' : '↑';
};

export const preparePaymentHistoryRequest = ({
  page,
  ...params
}: UsePaymentHistoryTableUtilsParams) => {
  const cursor = page * PAYMENT_HISTORY_PAGE_SIZE - PAYMENT_HISTORY_PAGE_SIZE;
  const limit = PAYMENT_HISTORY_PAGE_SIZE;

  return {
    ...params,
    cursor,
    limit,
  };
};

export const formatPaymentHistoryAmount = (amount: string) => {
  return new BigNumber(amount).toFixed(2);
};
