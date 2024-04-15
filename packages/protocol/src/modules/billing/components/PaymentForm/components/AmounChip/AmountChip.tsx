import { Chip } from '@ankr.com/ui';
import { useCallback } from 'react';
import { ChipProps } from '@mui/material';

import { IAmount } from 'modules/billing/types';

import { renderLabel } from './utils/renderLabel';

export interface IAmountChipProps extends IAmount {
  className?: string;
  isSelected?: boolean;
  onSelect?: (amount: IAmount) => void;
  shouldDisplayRequestsWhenSelected?: boolean;
  size?: ChipProps['size'];
}

type Color = ChipProps['color'];
type Variant = ChipProps['variant'];

export const AmountChip = ({
  className,
  currency,
  id,
  isSelected,
  onSelect: handleSelect,
  shouldDisplayRequestsWhenSelected,
  size,
  value,
}: IAmountChipProps) => {
  const [color, variant]: [Color, Variant] = isSelected
    ? ['primary', 'filled']
    : ['default', 'outlined'];

  const onSelect = useCallback(
    () => handleSelect?.({ currency, id, value }),
    [currency, id, handleSelect, value],
  );

  return (
    <Chip
      className={className}
      color={color}
      label={renderLabel({
        currency,
        id,
        isSelected,
        shouldDisplayRequestsWhenSelected,
        value,
      })}
      onClick={onSelect}
      size={size}
      variant={variant}
    />
  );
};
