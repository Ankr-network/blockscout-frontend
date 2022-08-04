import {
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';
import { ISelectOption } from 'uiKit/Select';

import { usePaymentTypeSelect } from './usePaymentTypeSelect';
import { useTimeframeSelect } from './useTimeframeSelect';

export interface Filters {
  changePaymentType: (event: any) => void;
  changeTimeframe: (event: any) => void;
  paymentTypeOptions: ISelectOption[];
  renderPaymentTypeValue: (value: unknown) => string;
  timeframeOptions: ISelectOption[];
}

export interface FiltersParams {
  setPaymentType: (type: PaymentType) => void;
  setTimeframe: (timeframe: PaymentHistoryTableTimeframe) => void;
}

export const useFilters = ({
  setPaymentType,
  setTimeframe,
}: FiltersParams): Filters => {
  const [changeTimeframe, timeframeOptions] = useTimeframeSelect(setTimeframe);
  const [changePaymentType, paymentTypeOptions, renderPaymentTypeValue] =
    usePaymentTypeSelect(setPaymentType);

  return {
    changePaymentType,
    changeTimeframe,
    paymentTypeOptions,
    renderPaymentTypeValue,
    timeframeOptions,
  };
};
