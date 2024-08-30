import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  BonusPurposeTable,
  useBonusPurposeTable,
} from './components/BonusPurposeTable';
import { Section } from '../Section';
import { TimePeriodFilter, useTimePeriodFilter } from '../TimePeriodFilter';
import { bonusHistorySectionTranslation } from './translation';
import { useBonusPurposeSectionStyles } from './useBonusPurposeSectionStyles';

export const BonusPurposeSection = () => {
  const { timePeriod, timePeriodFilterProps } = useTimePeriodFilter();
  const { bonusPurposeTableProps } = useBonusPurposeTable({ timePeriod });

  const { classes } = useBonusPurposeSectionStyles();
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
      <BonusPurposeTable {...bonusPurposeTableProps} />
    </Section>
  );
};
