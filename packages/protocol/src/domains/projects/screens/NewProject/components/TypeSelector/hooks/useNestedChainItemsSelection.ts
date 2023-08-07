import { ChangeEvent, useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { ChainType } from 'domains/chains/types';
import { ChainStepFields } from 'domains/projects/store';
import { EndpointGroup } from 'modules/endpoints/types';

export interface NestedItem extends EndpointGroup {
  chainId: string;
  label: string;
}

type ChainTypeField = Exclude<ChainStepFields, 'projectName' | 'tokenIndex'>;

const mapChainTypeToFormField = (chainType: ChainType): ChainTypeField => {
  switch (chainType) {
    default:
    case ChainType.Mainnet:
      return ChainStepFields.selectedMainnetIds;

    case ChainType.Testnet:
      return ChainStepFields.selectedTestnetIds;

    case ChainType.Devnet:
      return ChainStepFields.selectedDevnetIds;
  }
};

const checkIsParentUnchecked = (
  nestedItems: NestedItem[],
  checkedItems: string[],
) => {
  return nestedItems.every(({ chainId }) => !checkedItems.includes(chainId));
};

const checkIsParentChecked = (
  nestedItems: NestedItem[],
  checkedItems: string[],
) => {
  return nestedItems.every(({ chainId }) => checkedItems.includes(chainId));
};

const checkIsParentIndeterminate = (
  nestedItems: NestedItem[],
  checkedItems: string[],
) => {
  return (
    !checkIsParentChecked(nestedItems, checkedItems) &&
    !checkIsParentUnchecked(nestedItems, checkedItems)
  );
};

export const useNestedChainItemsSelection = (
  nestedItems: NestedItem[],
  chainType: ChainType,
) => {
  const { change, getState } = useForm();
  const { values } = getState();

  const currentTypeField = mapChainTypeToFormField(chainType);

  const checkedItems: string[] = useMemo(() => {
    return values[currentTypeField] || [];
  }, [currentTypeField, values]);

  const setCheckedItems = useCallback(
    (newCheckedItems: string[]) => change(currentTypeField, newCheckedItems),
    [change, currentTypeField],
  );

  const handleChangeAll = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        const newItems = nestedItems.map(item => item.chainId);

        return setCheckedItems([...checkedItems, ...newItems]);
      }

      const newItems = checkedItems.filter(
        selectedId => !nestedItems.some(item => item.chainId === selectedId),
      );

      return setCheckedItems(newItems);
    },
    [nestedItems, checkedItems, setCheckedItems],
  );

  const handleChangeItem = useCallback(
    (isChecked: boolean, chainId: string) => {
      const currentItemIndex = checkedItems.indexOf(chainId);

      if (isChecked) {
        return setCheckedItems([...checkedItems, chainId]);
      }

      if (!isChecked && currentItemIndex >= 0) {
        const newItems = checkedItems.filter(
          selectedId => selectedId !== chainId,
        );

        return setCheckedItems(newItems);
      }

      return null;
    },
    [checkedItems, setCheckedItems],
  );

  const isParentUnchecked = useMemo(() => {
    return checkIsParentUnchecked(nestedItems, checkedItems);
  }, [nestedItems, checkedItems]);

  const isParentChecked = useMemo(() => {
    if (isParentUnchecked) {
      return false;
    }

    return checkIsParentChecked(nestedItems, checkedItems);
  }, [nestedItems, checkedItems, isParentUnchecked]);

  const isParentIndeterminate = useMemo(() => {
    return checkIsParentIndeterminate(nestedItems, checkedItems);
  }, [nestedItems, checkedItems]);

  const handleParentOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      handleChangeAll(event.target.checked),
    [handleChangeAll],
  );

  return {
    isParentIndeterminate,
    isParentChecked,
    handleParentOnChange,
    checkedItems,
    handleChangeItem,
  };
};
