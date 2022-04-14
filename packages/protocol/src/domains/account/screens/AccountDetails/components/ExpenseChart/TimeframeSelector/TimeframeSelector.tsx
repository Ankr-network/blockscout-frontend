import React, { useCallback, useState } from 'react';

import { ExpenseChartTimeframe } from '../types';
import { Select } from 'uiKit/Select';
import { options } from './TimeframeSelectorUtils';

import { useStyles } from './TimeframeSelectorStyles';

interface Target {
  name?: string;
  value: unknown;
}

export interface TimeframeSelectorProps {
  onChange?: (timeframe: ExpenseChartTimeframe) => void;
}

export const TimeframeSelector = ({
  onChange: _onChange = () => {},
}: TimeframeSelectorProps) => {
  const [timeframe, setTimeframe] = useState(ExpenseChartTimeframe.OneMonth);

  const onChange = useCallback(
    (event: React.ChangeEvent<Target>) => {
      const frame = event.target.value as ExpenseChartTimeframe;

      setTimeframe(frame);

      _onChange(frame);
    },
    [_onChange],
  );

  const classes = useStyles();

  return (
    <Select
      className={classes.root}
      classes={{
        select: classes.select,
      }}
      iconClassName={classes.selectIcon}
      onChange={onChange}
      options={options}
      value={timeframe}
    />
  );
};
