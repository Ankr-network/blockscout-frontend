import { MenuItem, Select } from '@mui/material';
import { ArrowDown } from '@ankr.com/ui';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { OnChange } from './types';
import { periods } from './const';
import { timePeriodFilterTranslation } from './translation';
import { useTimePeriodFilterStyles } from './useTimePeriodFilterStyles';

export interface ITimePeriodFilterProps {
  className?: string;
  onChange: OnChange;
  period: ETimePeriod;
}

export const TimePeriodFilter = ({
  className,
  onChange,
  period,
}: ITimePeriodFilterProps) => {
  const { classes } = useTimePeriodFilterStyles();

  const { keys, t } = useTranslation(timePeriodFilterTranslation);

  return (
    <Select
      IconComponent={ArrowDown}
      className={className}
      classes={classes}
      onChange={onChange}
      size="small"
      value={period}
    >
      {periods.map(value => (
        <MenuItem key={value} value={value}>
          {t(keys[value])}
        </MenuItem>
      ))}
    </Select>
  );
};
