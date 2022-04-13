import { IPaymentHistoryEntity } from 'multirpc-sdk';
import {
  createContext,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from 'react';

export const PaymentHistoryDefaultParams: UsePaymentHistoryTableUtilsParams = {
  page: 1,
  orderBy: 'date',
  order: 'desc',
};

export interface UsePaymentHistoryTableUtilsParams {
  page: number;
  orderBy: string;
  order: string;
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
          order: tableParams.order === 'desc' ? 'asc' : 'desc',
          orderBy: field,
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

export const getPaymentHistoryItemSign = (
  direction: IPaymentHistoryEntity['direction'],
) => {
  return direction === 'income' ? '+' : '-';
};

export const getPaymentHistorySortArrow = (
  order: UsePaymentHistoryTableUtilsParams['order'],
) => {
  return order === 'desc' ? '↓' : '↑';
};
