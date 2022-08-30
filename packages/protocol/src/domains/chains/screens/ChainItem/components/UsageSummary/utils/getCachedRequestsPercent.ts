import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';

const DENOMINATOR = 100;
const key = 'chain-item.usage-data.usage-summary.cached.value';

export const getCachedRequestsPercent = (
  total: BigNumber = new BigNumber(1),
  cached: BigNumber = new BigNumber(0),
): string =>
  cached.gt(0)
    ? t(key, {
        cached: cached.dividedBy(total).multipliedBy(DENOMINATOR).toFormat(2),
      })
    : '-';
