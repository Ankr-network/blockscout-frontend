import { OverlaySpinner } from '@ankr.com/ui';

import { IAmount } from 'modules/billing/types';

import { AMOUNTS_COLUMNS } from './const';
import { AmountChips } from '../AmountChips';
import { AmountHeader } from '../AmountHeader';
import { AmountInput, IAmountInputProps } from '../AmountInput';
import { useOneTimeAmountStyles } from './useOneTimeAmountStyles';

export interface IOneTimeAmountProps {
  amountInputProps: IAmountInputProps;
  amounts: IAmount[];
  className?: string;
  isLoading: boolean;
  onAmountSelect: (amount: IAmount) => void;
  selectedAmountID?: IAmount['id'];
}

export const OneTimeAmount = ({
  amountInputProps,
  amounts,
  className,
  isLoading,
  onAmountSelect,
  selectedAmountID,
}: IOneTimeAmountProps) => {
  const { classes, cx } = useOneTimeAmountStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  return (
    <div className={cx(classes.oneTimeAmountRoot, className)}>
      <AmountHeader />
      <AmountInput {...amountInputProps} />
      <AmountChips
        amounts={amounts}
        columns={AMOUNTS_COLUMNS}
        onAmountSelect={onAmountSelect}
        selectedAmountID={selectedAmountID}
        size="small"
      />
    </div>
  );
};
