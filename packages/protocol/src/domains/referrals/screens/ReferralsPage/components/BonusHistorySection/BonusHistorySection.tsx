import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  BonusHistoryTable,
  useBonusHistoryTable,
} from './components/BonusHistoryTable';
import { Section } from '../Section';
import { TimePeriodFilter, useTimePeriodFilter } from '../TimePeriodFilter';
import { bonusHistorySectionTranslation } from './translation';
import { useBonusHistorySectionStyles } from './useBonusHistorySectionStyles';

export const BonusHistorySection = () => {
  const { timePeriod, timePeriodFilterProps } = useTimePeriodFilter();
  const { bonusHistoryTableProps } = useBonusHistoryTable({ timePeriod });

  const { classes } = useBonusHistorySectionStyles();
  const { keys, t } = useTranslation(bonusHistorySectionTranslation);

  return (
    <Section
      actions={
        <TimePeriodFilter
          className={classes.timePeriodFilter}
          {...timePeriodFilterProps}
        />
      }
      title={t(keys.title)}
    >
      <BonusHistoryTable {...bonusHistoryTableProps} />
    </Section>
  );
};
