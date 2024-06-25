import { IAmount } from 'modules/payments/types';

import { AmountChip, IAmountChipProps } from '../AmounChip';
import {
  IUseAmountChipsStylesProps,
  useAmountChipsStyles,
} from './useAmountChipsStyles';

export interface IAmountChipsProps extends IUseAmountChipsStylesProps {
  amounts: IAmount[];
  onAmountSelect?: (id: IAmount) => void;
  selectedAmountID?: IAmount['id'];
  shouldDisplayRequestsWhenSelected?: boolean;
  currentAmount?: number;
  size?: IAmountChipProps['size'];
  labelClassName?: string;
  extraRequestsRate?: number;
}

export const AmountChips = ({
  amounts,
  columns,
  currentAmount,
  extraRequestsRate,
  labelClassName,
  onAmountSelect,
  selectedAmountID,
  shouldDisplayRequestsWhenSelected,
  size,
}: IAmountChipsProps) => {
  const { classes, cx } = useAmountChipsStyles({ columns });

  return (
    <div className={classes.amountChipsRoot}>
      {amounts.map(amount => {
        const { id } = amount;
        const isSelected = id === selectedAmountID;

        return (
          <AmountChip
            {...amount}
            className={cx(classes.chip, labelClassName)}
            isSelected={isSelected}
            currentAmount={currentAmount}
            key={id}
            onSelect={onAmountSelect}
            shouldDisplayRequestsWhenSelected={
              shouldDisplayRequestsWhenSelected
            }
            size={size}
            extraRequestsRate={extraRequestsRate}
          />
        );
      })}
    </div>
  );
};
