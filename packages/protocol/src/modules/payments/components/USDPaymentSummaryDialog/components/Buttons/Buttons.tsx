import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useButtonsStyles } from './useButtonsStyles';

export interface IButtonsProps {
  className?: string;
  isProceeding?: boolean;
  onCancelButtonClick: () => void;
  onProceedButtonClick: () => void;
}

export const Buttons = ({
  className,
  isProceeding,
  onCancelButtonClick,
  onProceedButtonClick,
}: IButtonsProps) => {
  const { classes, cx } = useButtonsStyles();

  return (
    <div className={cx(classes.root, className)}>
      <LoadingButton
        fullWidth
        loading={isProceeding}
        onClick={onProceedButtonClick}
        size="large"
        variant="contained"
      >
        {t('account.payment-summary-dialog.usd.proceed-button')}
      </LoadingButton>
      <LoadingButton
        fullWidth
        onClick={onCancelButtonClick}
        size="large"
        variant="outlined"
      >
        {t('account.payment-summary-dialog.cancel-button')}
      </LoadingButton>
    </div>
  );
};
