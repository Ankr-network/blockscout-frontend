import { Box } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { IPaymentHistoryEntityType } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';

import { Select } from 'uiKit/Select';
import { PAYMENT_HISTORY_TYPE } from '../PaymentsHistoryTableUtils';
import { useStyles } from './FiltersStyles';
import { IFiltersProps, IPaymentEntityType, ITimeType } from './FiltersTypes';
import {
  prepareTimeForRequest,
  useTimeSelectOptions,
  useTypeSelectOptions,
  DEFAULT_TIME_VALUE,
  prepareTypeForRequest,
} from './FiltersUtils';

export const Filters = ({ onFetchPaymentHistory }: IFiltersProps) => {
  const classes = useStyles();

  const [timeValue, setTimeValue] = useState<ITimeType>(DEFAULT_TIME_VALUE);
  const [typeValue, setTypeValue] = useState<IPaymentEntityType>('ALL');

  const typeOptions = useTypeSelectOptions();
  const timeOptions = useTimeSelectOptions();

  const handleTypeChange = useCallback(event => {
    const value = event?.target?.value as IPaymentEntityType;
    setTypeValue(value);
  }, []);

  const handleTimeChange = useCallback(event => {
    const value = event?.target?.value as ITimeType;
    setTimeValue(value);
  }, []);

  useEffect(() => {
    const { from, to } = prepareTimeForRequest(timeValue);
    const types = prepareTypeForRequest(typeValue);

    onFetchPaymentHistory(from, to, types);
  }, [onFetchPaymentHistory, timeValue, typeValue]);

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
        iconClassName={classes.selectIcon}
        value={timeValue}
        onChange={handleTimeChange}
        options={timeOptions}
        fullWidth={false}
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
        iconClassName={classes.selectIcon}
        onChange={handleTypeChange}
        options={typeOptions}
        displayEmpty
        value={typeValue}
        fullWidth={false}
        renderValue={(value: unknown) => {
          if (value === 'ALL') {
            return t('account.payment-table.payment-type.all');
          }

          return value
            ? PAYMENT_HISTORY_TYPE[value as IPaymentHistoryEntityType]
            : t('account.payment-table.payment-type.placeholder');
        }}
      />
    </Box>
  );
};
