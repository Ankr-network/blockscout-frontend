import { IAmount } from 'modules/billing/types';

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
  size?: IAmountChipProps['size'];
}

export const AmountChips = ({
  amounts,
  columns,
  onAmountSelect,
  selectedAmountID,
  shouldDisplayRequestsWhenSelected,
  size,
}: IAmountChipsProps) => {
  const { classes } = useAmountChipsStyles({ columns });

  return (
    <div className={classes.amountChipsRoot}>
      {amounts.map(amount => {
        const { id } = amount;
        const isSelected = id === selectedAmountID;

        return (
          <AmountChip
            {...amount}
            className={classes.chip}
            isSelected={isSelected}
            key={id}
            onSelect={onAmountSelect}
            shouldDisplayRequestsWhenSelected={
              shouldDisplayRequestsWhenSelected
            }
            size={size}
          />
        );
      })}
    </div>
  );
};
