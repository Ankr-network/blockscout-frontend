import { Button } from '@mui/material';
import { Github, Google } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useOAuthButtonsStyles } from './useOAuthButtonsStyles';

export interface IOAuthButtonsProps {
  hasError?: boolean;
  hasGoogleAuthOnly?: boolean;
  onGithubButtonClick: () => void;
  onGoogleButtonClick: () => void;
}

export const OAuthButtons = ({
  hasError,
  hasGoogleAuthOnly,
  onGithubButtonClick,
  onGoogleButtonClick,
}: IOAuthButtonsProps) => {
  const { classes } = useOAuthButtonsStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        disabled={hasError}
        fullWidth
        onClick={onGoogleButtonClick}
        startIcon={<Google className={classes.icon} />}
        type="submit"
        variant="outlined"
      >
        {t('signup-modal.web2.google')}
      </Button>
      {!hasGoogleAuthOnly && (
        <Button
          className={classes.button}
          disabled={hasError}
          fullWidth
          onClick={onGithubButtonClick}
          startIcon={<Github className={classes.icon} />}
          type="submit"
          variant="outlined"
        >
          {t('signup-modal.web2.github')}
        </Button>
      )}
    </div>
  );
};
