import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { Locale } from 'modules/i18n';

export const timePeriodFilterTranslation = {
  [Locale.en]: {
    [ETimePeriod.AllTime]: 'All time',
    [ETimePeriod.LastWeek]: 'Last week',
    [ETimePeriod.LastMonth]: 'Last month',
    [ETimePeriod.LastYear]: 'Last year',
  },
};
