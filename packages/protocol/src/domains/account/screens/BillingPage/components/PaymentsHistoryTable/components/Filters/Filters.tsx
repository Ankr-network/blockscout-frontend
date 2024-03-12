import { Box, MenuItem } from '@mui/material';
import { Select } from '@ankr.com/ui';

import {
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';

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
        size="small"
        value={timeframe}
      >
        {timeframeOptions.map(timeframeOption => (
          <MenuItem
            key={timeframeOption.value}
            value={timeframeOption.value}
            disabled={timeframeOption.disabled}
          >
            {timeframeOption.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        displayEmpty
        fullWidth={false}
        onChange={changePaymentType}
        renderValue={renderPaymentTypeValue}
        size="small"
        value={paymentType}
      >
        {paymentTypeOptions.map(paymentOption => (
          <MenuItem
            key={paymentOption.value}
            value={paymentOption.value}
            disabled={paymentOption.disabled}
          >
            {paymentOption.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
