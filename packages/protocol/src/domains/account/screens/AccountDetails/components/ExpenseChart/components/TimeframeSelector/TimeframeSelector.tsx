import React, { useCallback } from 'react';

import { ChartTimeframe } from '../../types';
import { Select } from 'uiKit/Select';
import { options } from './const';

import { useStyles } from './TimeframeSelectorStyles';

interface Target {
  name?: string;
  value: unknown;
}

export interface TimeframeSelectorProps {
  onChange: (timeframe: ChartTimeframe) => void;
  timeframe: ChartTimeframe;
}

export const TimeframeSelector = ({
  onChange: onChange_,
  timeframe,
}: TimeframeSelectorProps) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<Target>) => {
      const frame = event.target.value as ChartTimeframe;

      onChange_(frame);
    },
    [onChange_],
  );

  const classes = useStyles();

  return (
    <Select
      MenuProps={{
        classes: {
          paper: classes.menuPaper,
        },
      }}
      className={classes.root}
      classes={{
        select: classes.select,
      }}
      fullWidth={false}
      iconClassName={classes.selectIcon}
      onChange={onChange}
      options={options}
      value={timeframe}
    />
  );
};
