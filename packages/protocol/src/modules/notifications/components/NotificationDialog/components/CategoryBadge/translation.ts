import { ENotificationCategory } from 'multirpc-sdk';

import { Locale } from 'modules/i18n';

export const categoryBadgeTranslation = {
  [Locale.en]: {
    [ENotificationCategory.BILLING]: 'Billing',
    [ENotificationCategory.NEWS]: 'News',
    [ENotificationCategory.SYSTEM]: 'System',
    [ENotificationCategory.UNKNOWN]: 'Unknown',
  },
};
