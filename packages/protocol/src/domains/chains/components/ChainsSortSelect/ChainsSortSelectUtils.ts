import { t } from '@ankr.com/common';

import { SortType } from 'modules/chains/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

export interface Option {
  label: string;
  value: string;
}

export const useOptions = (): Option[] => {
  return useLocaleMemo(
    () => [
      {
        value: SortType.Usage,
        label: t('chains.sort.usage'),
      },
      {
        value: SortType.Name,
        label: t('chains.sort.name'),
      },
    ],
    [],
  );
};
