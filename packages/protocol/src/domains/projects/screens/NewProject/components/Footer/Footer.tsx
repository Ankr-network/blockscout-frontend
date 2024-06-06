import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useForm } from 'react-final-form';
import { useCallback } from 'react';

import { LoadingButton } from 'uiKit/LoadingButton';
import { newProjectIntlRoot } from 'domains/projects/const';
import { WhitelistStepFields } from 'domains/projects/store';
import { NewProjectStep } from 'domains/projects/types';

import { useFooterStyles } from './useFooterStyles';

interface FooterProps {
  step: NewProjectStep;
  onBackClick: () => void;
  shouldShowSkipButton?: boolean;
  isBackButtonDisabled?: boolean;
  isLoading: boolean;
  isNextButtonDisabled?: boolean;
}

export const Footer = ({
  isBackButtonDisabled,
  isLoading,
  isNextButtonDisabled,
  onBackClick,
  shouldShowSkipButton,
  step,
}: FooterProps) => {
  const { classes } = useFooterStyles();
  const { change, getState } = useForm();
  const { validating } = getState();

  const handleSkipClick = useCallback(() => {
    change(WhitelistStepFields.whitelistItems, []);
  }, [change]);

  return (
    <Paper className={classes.root}>
      <Button
        size="large"
        onClick={onBackClick}
        variant="outlined"
        disabled={isBackButtonDisabled || isLoading}
      >
        {t(
          `${newProjectIntlRoot}.footer.${
            step === NewProjectStep.General
              ? 'back-to-projects-button'
              : 'back-button'
          }`,
        )}
      </Button>
      <Typography variant="body2" component="p" className={classes.step}>
        {t(`${newProjectIntlRoot}.footer.step-counter`, {
          value: ++step,
        })}
      </Typography>
      <div className={classes.rightWrapper}>
        {shouldShowSkipButton ? (
          <LoadingButton
            size="large"
            variant="outlined"
            type="submit"
            className={classes.skipButton}
            onClick={handleSkipClick}
            loading={isLoading}
          >
            {t(`${newProjectIntlRoot}.footer.skip-button`)}
          </LoadingButton>
        ) : (
          <LoadingButton
            size="large"
            type="submit"
            disabled={isLoading || validating || isNextButtonDisabled}
            loading={isLoading}
          >
            {t(`${newProjectIntlRoot}.footer.next-button`)}
          </LoadingButton>
        )}
      </div>
    </Paper>
  );
};
