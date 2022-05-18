import { useCallback, useState } from 'react';

import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';

export enum SortType {
  Name = 'name',
  Usage = 'usage',
}

type IUseSortSelectType = [SortType, (type: SortType) => void];

export const useSortSelect = (): IUseSortSelectType => {
  const [sortType, setSortType] = useState(SortType.Name);

  const onSetSortType = useCallback((type: SortType) => {
    setSortType(type);
  }, []);

  return [sortType, onSetSortType];
};

export const useOptions = () => {
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
