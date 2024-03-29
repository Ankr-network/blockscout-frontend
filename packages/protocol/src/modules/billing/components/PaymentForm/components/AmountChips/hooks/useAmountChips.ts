import { useCallback, useEffect, useState } from 'react';

import { IAmount } from 'modules/billing/types';

import { IAmountChipsProps } from '../AmountChips';

type TPropsToExtend = Partial<
  Pick<IAmountChipsProps, 'onAmountSelect' | 'selectedAmountID'>
>;

export interface IUseAmountChipsProps extends TPropsToExtend {}

export const useAmountChips = ({
  selectedAmountID: initiallySelectedAmountID,
  onAmountSelect,
}: IUseAmountChipsProps) => {
  const [selectedAmountID, setSelectedAmountID] = useState(
    initiallySelectedAmountID,
  );

  const handleAmountSelect = useCallback(
    (amount: IAmount) => {
      setSelectedAmountID(amount.id);

      onAmountSelect?.(amount);
    },
    [onAmountSelect],
  );

  useEffect(() => {
    setSelectedAmountID(initiallySelectedAmountID);
  }, [initiallySelectedAmountID]);

  return { onAmountSelect: handleAmountSelect, selectedAmountID };
};
