import { Box } from '@material-ui/core';
import {
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';

import { Select } from 'uiKit/Select';
import { useStyles } from './FiltersStyles';
import { useFilters } from './hooks/useFilters';

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

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Select
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
        }}
        className={classes.select}
        classes={{
          select: classes.selector,
        }}
        fullWidth={false}
        iconClassName={classes.selectIcon}
        onChange={changeTimeframe}
        options={timeframeOptions}
        value={timeframe}
      />
      <Select
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
        }}
        className={classes.select}
        classes={{
          select: classes.selector,
        }}
        displayEmpty
        fullWidth={false}
        iconClassName={classes.selectIcon}
        onChange={changePaymentType}
        options={paymentTypeOptions}
        renderValue={renderPaymentTypeValue}
        value={paymentType}
      />
    </Box>
  );
};
