import { Check, Chip } from '@ankr.com/ui';
import { useCallback, useMemo } from 'react';
import { ChipProps } from '@mui/material';

import { IAmount } from 'modules/payments/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useAmountChipStyles } from 'modules/payments/components/PaymentForm/components/AmounChip/useAmountChipStyles';
import { chipTranslation } from 'modules/payments/components/PaymentForm/components/AmounChip/translation';

import { renderLabel } from './utils/renderLabel';

export interface IAmountChipProps extends IAmount {
  className?: string;
  isSelected?: boolean;
  onSelect?: (amount: IAmount) => void;
  shouldDisplayRequestsWhenSelected?: boolean;
  size?: ChipProps['size'];
  currentAmount?: number;
  extraRequestsRate?: number;
}

type Color = ChipProps['color'];
type Variant = ChipProps['variant'];

export const AmountChip = ({
  className,
  currency,
  currentAmount,
  extraRequestsRate,
  id,
  isSelected,
  onSelect: handleSelect,
  shouldDisplayRequestsWhenSelected,
  size,
  value,
}: IAmountChipProps) => {
  const isActiveChip = !!currentAmount && currentAmount === value;
  const isDisabled = !!currentAmount && value <= currentAmount;

  const { classes, cx } = useAmountChipStyles(isDisabled);

  const { keys, t } = useTranslation(chipTranslation);

  const [color, variant]: [Color, Variant] =
    isSelected && !isDisabled ? ['primary', 'filled'] : ['default', 'outlined'];

  const onSelect = useCallback(() => {
    if (!isDisabled) {
      handleSelect?.({ currency, id, value });
    }
  }, [currency, id, handleSelect, value, isDisabled]);

  const tooltipText = useMemo(() => {
    if (isActiveChip) {
      return t(keys.currentDeal);
    }

    if (isDisabled) {
      return t(keys.lowerDeal);
    }

    return '';
  }, [isActiveChip, isDisabled, keys.currentDeal, keys.lowerDeal, t]);

  return (
    <TooltipWrapper hasIcon={false} tooltipText={tooltipText}>
      <Chip
        className={cx(classes.root, className)}
        icon={isActiveChip ? <Check className={classes.icon} /> : undefined}
        color={color}
        label={renderLabel({
          currency,
          id,
          isSelected,
          shouldDisplayRequestsWhenSelected:
            !isDisabled && shouldDisplayRequestsWhenSelected,
          value,
          extraRequestsRate,
        })}
        onClick={onSelect}
        size={size}
        variant={variant}
      />
    </TooltipWrapper>
  );
};
