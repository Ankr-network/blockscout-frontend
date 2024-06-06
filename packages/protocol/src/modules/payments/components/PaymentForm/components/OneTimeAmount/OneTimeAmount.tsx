import { OverlaySpinner } from '@ankr.com/ui';

import { IAmount } from 'modules/payments/types';

import { AMOUNTS_COLUMNS } from './const';
import { AmountChips } from '../AmountChips';
import { AmountHeader, IAmountHeaderProps } from '../AmountHeader';
import { AmountInput, IAmountInputProps } from '../AmountInput';
import { useOneTimeAmountStyles } from './useOneTimeAmountStyles';

export interface IOneTimeAmountProps extends IAmountHeaderProps {
  amountInputProps: IAmountInputProps;
  amounts: IAmount[];
  className?: string;
  isLoading: boolean;
  onAmountSelect: (amount: IAmount) => void;
  selectedAmountID?: IAmount['id'];
  hasChips?: boolean;
}

export const OneTimeAmount = ({
  amountInputProps,
  amounts,
  className,
  hasChips = true,
  hasDocsLink,
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
      <AmountHeader hasDocsLink={hasDocsLink} />
      <AmountInput {...amountInputProps} />
      {hasChips && (
        <AmountChips
          amounts={amounts}
          columns={AMOUNTS_COLUMNS}
          onAmountSelect={onAmountSelect}
          selectedAmountID={selectedAmountID}
          size="small"
        />
      )}
    </div>
  );
};
