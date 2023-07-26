import { useCallback } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select } from 'uiKit/Select';

import { ChartTimeframe } from '../../types';
import { getOptions } from './const';
import { useStyles } from './TimeframeSelectorStyles';

export interface TimeframeSelectorProps {
  onChange: (timeframe: ChartTimeframe) => void;
  timeframe: ChartTimeframe;
}

export const TimeframeSelector = ({
  onChange: onChange_,
  timeframe,
}: TimeframeSelectorProps) => {
  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const frame = event.target.value as ChartTimeframe;

      onChange_(frame);
    },
    [onChange_],
  );

  const { classes } = useStyles();

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
      options={getOptions()}
      value={timeframe}
    />
  );
};
