import { useCallback } from 'react';

import { ISelectOption } from 'uiKit/Select';

import { SelectedContent } from '../../ChainSelector/SelectedContent';

export const useGroupSelector = (groups: ISelectOption[]) => {
  const renderValue = useCallback(
    (value: string) => {
      const group = groups.find(item => item.value === value);

      return <SelectedContent>{group?.label}</SelectedContent>;
    },
    [groups],
  );

  return { renderValue };
};
