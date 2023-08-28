import { tHTML, t } from '@ankr.com/common';
import { Typography, Button } from '@mui/material';
import { Refresh } from '@ankr.com/ui';

import { useFailedAddProjectContentStyles } from './useFailedAddProjectContentStyles';

interface FailedAddProjectContentProps {
  handleRetry: () => void;
  onClose: () => void;
}

export const FailedAddProjectContent = ({
  handleRetry,
  onClose,
}: FailedAddProjectContentProps) => {
  const { classes } = useFailedAddProjectContentStyles();

  return (
    <>
      <Typography variant="body2" component="p" className={classes.description}>
        {tHTML('projects.new-project.failed-dialog.description')}
      </Typography>

      <Button
        fullWidth
        size="large"
        variant="contained"
        className={classes.retryButton}
        onClick={handleRetry}
      >
        <Refresh className={classes.retryIcon} />
        {t('projects.new-project.failed-dialog.retry')}
      </Button>

      <Button fullWidth size="large" variant="outlined" onClick={onClose}>
        {t('projects.new-project.failed-dialog.cancel')}
      </Button>
    </>
  );
};
