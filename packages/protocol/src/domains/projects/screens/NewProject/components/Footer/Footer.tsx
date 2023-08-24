import { Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { useForm } from 'react-final-form';

import { LoadingButton } from 'uiKit/LoadingButton';
import { newProjectIntlRoot } from 'domains/projects/const';

import { useFooterStyles } from './useFooterStyles';

interface FooterProps {
  onBackClick: () => void;
  shouldShowSkipButton?: boolean;
  isBackButtonDisabled?: boolean;
  isLoading: boolean;
  isNextButtonDisabled?: boolean;
}

export const Footer = ({
  onBackClick,
  shouldShowSkipButton,
  isBackButtonDisabled,
  isLoading,
  isNextButtonDisabled,
}: FooterProps) => {
  const { classes } = useFooterStyles();
  const form = useForm();
  const { validating } = form.getState();

  return (
    <div className={classes.root}>
      <Button
        size="large"
        onClick={onBackClick}
        variant="outlined"
        disabled={isBackButtonDisabled || isLoading}
      >
        {t(`${newProjectIntlRoot}.footer.back-button`)}
      </Button>
      <div className={classes.rightWrapper}>
        {shouldShowSkipButton && (
          <Button
            size="large"
            variant="outlined"
            type="submit"
            className={classes.skipButton}
          >
            {t(`${newProjectIntlRoot}.footer.skip-button`)}
          </Button>
        )}
        <LoadingButton
          size="large"
          type="submit"
          disabled={isLoading || validating || isNextButtonDisabled}
          loading={isLoading}
        >
          {t(`${newProjectIntlRoot}.footer.next-button`)}
        </LoadingButton>
      </div>
    </div>
  );
};
