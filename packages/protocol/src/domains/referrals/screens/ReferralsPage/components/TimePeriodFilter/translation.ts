import { ERewardTxsPeriod } from 'modules/referralProgram/types';
import { Locale } from 'modules/i18n';

export const timePeriodFilterTranslation = {
  [Locale.en]: {
    [ERewardTxsPeriod.AllTime]: 'All time',
    [ERewardTxsPeriod.LastWeek]: 'Last week',
    [ERewardTxsPeriod.LastMonth]: 'Last month',
    [ERewardTxsPeriod.LastYear]: 'Last year',
  },
};
