import { t } from '@ankr.com/common';

import { TableVariant } from '../../types';

export const getMessage = (variant: TableVariant) => {
  switch (variant) {
    case TableVariant.Default:
      return t('chain-item.usage-data.last-requests.empty');

    case TableVariant.Integrated:
      return t('chain-item.usage-data.last-requests.integrated-empty');

    default:
      return '';
  }
};
