import { useCallback } from 'react';

import { ISelectOption } from 'uiKit/Select';

import { SelectedContent } from '../../ChainSelector/SelectedContent';

export const useTypeSelector = (chainTypes: ISelectOption[]) => {
  const renderValue = useCallback(
    (value: string) => {
      const chainType = chainTypes.find(item => item.value === value);

      return <SelectedContent>{chainType?.label}</SelectedContent>;
    },
    [chainTypes],
  );

  return { renderValue };
};
