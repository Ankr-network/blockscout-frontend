import { Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';

import { useActionButtonStyles } from './useActionButtonStyles';
import { INTL_PLANS_ROOT, EPlanList } from '../../PlansUtils';

export interface IActionButtonProps {
  planName: EPlanList;
  isButtonDisabled: boolean;
  isCurrentPlan: boolean;
  onClick: () => void;
}

export const ActionButton = ({
  isButtonDisabled,
  isCurrentPlan,
  onClick,
  planName,
}: IActionButtonProps) => {
  const { classes, cx } = useActionButtonStyles();

  const isFreePlan = planName === EPlanList.Free;
  const isPremiumPlan = planName === EPlanList.Premium;

  if (isCurrentPlan && isFreePlan) {
    return (
      <Button
        fullWidth
        disabled
        className={cx(
          classes.button,
          classes.currentPlanButton,
          classes.freeButton,
        )}
        onClick={onClick}
        variant="outlined"
        startIcon={<Check />}
      >
        {t(`${INTL_PLANS_ROOT}.current-plan`)}
      </Button>
    );
  }

  if (isCurrentPlan && isPremiumPlan) {
    return (
      <Button
        fullWidth
        disabled
        className={cx(classes.button, classes.currentPlanButton)}
        onClick={onClick}
        variant="contained"
        startIcon={<Check />}
      >
        {t(`${INTL_PLANS_ROOT}.current-plan`)}
      </Button>
    );
  }

  return (
    <Button
      fullWidth
      className={cx(classes.button, isFreePlan && classes.freeButton)}
      onClick={onClick}
      variant={isFreePlan ? 'outlined' : 'contained'}
      disabled={isButtonDisabled}
    >
      {t(`${INTL_PLANS_ROOT}.${planName}.button`)}
    </Button>
  );
};
