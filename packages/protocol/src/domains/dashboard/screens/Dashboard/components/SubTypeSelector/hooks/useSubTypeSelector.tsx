import { useCallback } from 'react';

import { ISelectOption } from 'uiKit/Select';
import { SelectedContent } from '../../ChainSelector/SelectedContent';

export const useSubTypeSelector = (chainSubTypes: ISelectOption[]) => {
  const renderValue = useCallback(
    (value: string) => {
      const chainSubType = chainSubTypes.find(item => item.value === value);

      return <SelectedContent>{chainSubType?.label}</SelectedContent>;
    },
    [chainSubTypes],
  );

  return { renderValue };
};
