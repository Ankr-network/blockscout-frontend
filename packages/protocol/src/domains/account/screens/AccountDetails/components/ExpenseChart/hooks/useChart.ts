import { ChartCurrency, ChartTimeframe } from '../types';
import { Formatters, useFormatters } from './useFormatters';
import { IChartData } from 'modules/common/components/Chart';
import { getTransactions } from '../utils/getTransactions';
import { useAuth } from 'domains/account/hooks/useAuth';
import { useCurrency } from './useCurrency';
import { usePaymentHistory } from './usePaymentHistory';
import { useTimeframe } from './useTimeframe';

export interface Chart {
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
  const { isConnected, isConnecting } = useAuth();

  const [currency, switchCurrency] = useCurrency();
  const [timeframe, setTimeframe] = useTimeframe();
  const [payments, isLoading] = usePaymentHistory({ isConnected, timeframe });
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
