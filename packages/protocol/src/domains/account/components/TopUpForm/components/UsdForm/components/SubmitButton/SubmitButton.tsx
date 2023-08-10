import { TopUp } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { LoadingButton } from 'uiKit/LoadingButton';

import { useSubmitButtonStyles } from './SubmitButtonStyles';

export interface SubmitButtonProps {
  hasCancelLabel: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export const SubmitButton = ({
  hasCancelLabel,
  isDisabled,
  isLoading,
  onClick,
}: SubmitButtonProps) => {
  const { classes } = useSubmitButtonStyles(hasCancelLabel);

  return (
    <div className={classes.root}>
      <LoadingButton
        className={classes.button}
        color="primary"
        disabled={isDisabled}
        fullWidth
        loading={isLoading}
        onClick={onClick}
        startIcon={<TopUp />}
      >
        {t('account.account-details.top-up.top-up')}
      </LoadingButton>
      <div className={classes.cancelLabel}>
        {t('account.account-details.top-up.cancel-label')}
      </div>
    </div>
  )
};
