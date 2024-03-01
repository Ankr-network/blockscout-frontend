import { Box } from '@mui/material';

import {
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';
import { Select } from 'uiKit/Select';

import { useFilters } from './hooks/useFilters';
import { useFiltersStyles } from './useFiltersStyles';

export interface FiltersProps {
  paymentType: PaymentType;
  setPaymentType: (type: PaymentType) => void;
  setTimeframe: (timeframe: PaymentHistoryTableTimeframe) => void;
  timeframe: PaymentHistoryTableTimeframe;
}

export const Filters = ({
  paymentType,
  setPaymentType,
  setTimeframe,
  timeframe,
}: FiltersProps) => {
  const {
    changePaymentType,
    changeTimeframe,
    paymentTypeOptions,
    renderPaymentTypeValue,
    timeframeOptions,
  } = useFilters({ setPaymentType, setTimeframe });

  const { classes } = useFiltersStyles();

  return (
    <Box className={classes.root}>
      <Select
        fullWidth={false}
        onChange={changeTimeframe}
        options={timeframeOptions}
        size="small"
        value={timeframe}
      />
      <Select
        displayEmpty
        fullWidth={false}
        onChange={changePaymentType}
        options={paymentTypeOptions}
        renderValue={renderPaymentTypeValue}
        size="small"
        value={paymentType}
      />
    </Box>
  );
};
