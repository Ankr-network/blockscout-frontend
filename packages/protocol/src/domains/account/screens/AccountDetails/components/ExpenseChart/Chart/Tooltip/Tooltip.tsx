import React from 'react';
import { Box } from '@material-ui/core';

import { IChartData } from 'modules/common/components/Chart';
import { i18nKeyRoot } from '../../ExpenseChartUtils';

import { useStyles } from './TooltipStyles';
import { t } from 'modules/i18n/utils/intl';

interface Payload {
  value: number;
  payload: IChartData;
}

interface TooltipProps {
  active?: boolean;
  payload?: Payload[];
}

export const Tooltip = ({ active, payload }: TooltipProps) => {
  const classes = useStyles();

  const isActive = active && payload && payload.length > 0;

  return isActive ? (
    <Box className={classes.tooltipRoot}>
      <div className={classes.value}>{payload[0].payload.value} ANKR</div>
      <div className={classes.time}>
        {t(`${i18nKeyRoot}.chart.medium-date`, {
          value: payload[0].payload.time,
        })}
      </div>
    </Box>
  ) : null;
};
