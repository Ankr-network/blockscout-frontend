import { IChartData } from 'modules/common/components/Chart';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { ChartCurrency, ChartTimeframe } from '../types';
import { Formatters, useFormatters } from './useFormatters';
import { getTransactions } from '../utils/getTransactions';
import { useCurrency } from './useCurrency';
import { usePaymentHistory } from './usePaymentHistory';
import { useTimeframe } from './useTimeframe';

interface Chart {
  currency: ChartCurrency;
  isLoading: boolean;
  setTimeframe: (timeframe: ChartTimeframe) => void;
  switchCurrency: () => void;
  timeframe: ChartTimeframe;
  transactions: IChartData[];
  xFormatter: Formatters[0];
  yFormatter: Formatters[1];
}

export const useChart = (): Chart => {
  const { hasPrivateAccess, loading: isConnecting } = useAuth();

  const [currency, switchCurrency] = useCurrency();
  const [timeframe, setTimeframe] = useTimeframe();
  const [payments, isLoading] = usePaymentHistory({
    hasPrivateAccess,
    timeframe,
  });
  const [xFormatter, yFormatter] = useFormatters(timeframe);

  const transactions = getTransactions({ currency, payments, timeframe });

  return {
    currency,
    isLoading: isConnecting || isLoading,
    setTimeframe,
    switchCurrency,
    timeframe,
    transactions,
    xFormatter,
    yFormatter,
  };
};
