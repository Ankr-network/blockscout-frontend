import { Button } from '@mui/material';
import { Check } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useActionButtonStyles } from './useActionButtonStyles';
import { plansTranslation } from '../../plansTranslation';
import { IUseActionButtonProps, useActionButton } from './useActionButton';

export interface IActionButtonProps extends IUseActionButtonProps {
  isCurrentShortText?: boolean;
  className?: string;
}

/* eslint-disable max-lines-per-function */
export const ActionButton = ({
  className,
  clickCallback,
  isCurrentShortText = false,
  planName,
}: IActionButtonProps) => {
  const { classes, cx } = useActionButtonStyles();

  const { keys, t } = useTranslation(plansTranslation);

  const {
    billingPageRedirect,
    chainsPageRedirect,
    hasPlanAccess,
    isButtonDisabledValue,
    isCurrentPlan,
    isDealPlan,
    isFreePlan,
    isLoggedIn,
    isPAYGPlan,
    openSignupDialog,
    openTopUpDialog,
    renderDialogs,
    shouldShowFreemium,
  } = useActionButton({ planName, clickCallback });

  const currentPlanText = t(
    isCurrentShortText ? keys.shortCurrentPlan : keys.currentPlan,
  );

  if (isFreePlan && isLoggedIn) {
    return (
      <Button
        fullWidth
        disabled
        className={cx(
          classes.button,
          classes.currentPlanButton,
          classes.freeButton,
          className,
        )}
        variant="outlined"
        startIcon={shouldShowFreemium && <Check />}
      >
        {shouldShowFreemium ? currentPlanText : t(keys.startFree)}
      </Button>
    );
  }

  if (isFreePlan && !isLoggedIn) {
    return (
      <Button
        fullWidth
        className={cx(
          classes.button,
          classes.currentPlanButton,
          classes.freeButton,
          className,
        )}
        onClick={chainsPageRedirect}
        variant="outlined"
      >
        {t(keys.startFree)}
      </Button>
    );
  }

  if (!hasPlanAccess) {
    return (
      <Button
        disabled
        fullWidth
        className={cx(classes.button, className)}
        onClick={shouldShowFreemium ? openTopUpDialog : billingPageRedirect}
        variant={isFreePlan ? 'outlined' : 'contained'}
      >
        {t(keys.start)}
      </Button>
    );
  }

  if (isPAYGPlan && !isLoggedIn) {
    return (
      <>
        <Button
          fullWidth
          className={cx(
            classes.button,
            isFreePlan && classes.freeButton,
            className,
          )}
          onClick={openSignupDialog}
          variant={isFreePlan ? 'outlined' : 'contained'}
          disabled={isButtonDisabledValue}
        >
          {t(keys.start)}
        </Button>
        {renderDialogs()}
      </>
    );
  }

  if (isPAYGPlan && isLoggedIn) {
    return (
      <>
        <Button
          fullWidth
          className={cx(
            classes.button,
            isFreePlan && classes.freeButton,
            className,
          )}
          onClick={shouldShowFreemium ? openTopUpDialog : billingPageRedirect}
          variant={isFreePlan ? 'outlined' : 'contained'}
          disabled={isButtonDisabledValue}
        >
          {t(keys.start)}
        </Button>
        {renderDialogs()}
      </>
    );
  }

  if (isDealPlan && !isLoggedIn) {
    return (
      <>
        <Button
          fullWidth
          className={cx(classes.button, className)}
          onClick={openSignupDialog}
          variant={isFreePlan ? 'outlined' : 'contained'}
          disabled={isButtonDisabledValue}
        >
          {t(keys.start)}
        </Button>
        {renderDialogs()}
      </>
    );
  }

  if (isDealPlan && isLoggedIn && !isCurrentPlan) {
    return (
      <>
        <Button
          fullWidth
          className={cx(classes.button, className)}
          onClick={shouldShowFreemium ? openTopUpDialog : billingPageRedirect}
          variant={isFreePlan ? 'outlined' : 'contained'}
          disabled={isButtonDisabledValue}
        >
          {t(keys.start)}
        </Button>
        {renderDialogs()}
      </>
    );
  }

  return (
    <Button
      fullWidth
      disabled
      className={cx(classes.button, classes.currentPlanButton, className)}
      variant="contained"
      startIcon={<Check />}
    >
      {currentPlanText}
    </Button>
  );
};
